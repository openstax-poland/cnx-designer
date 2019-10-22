// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Seq } from 'immutable'
import { Operation, Value } from 'slate'

const DB_NAME = 'cnx:designer:persist'
const DB_VERSION = 1

/**
 * Convert an IndexedDB request into a promise.
 */
function promisify(req) {
    return new Promise((resolve, reject) => {
        req.onerror = () => reject(req.error)
        req.onsuccess = () => resolve(req.result)
    })
}

/**
 * Call closure once for each item in a cursor.
 *
 * The closure is responsible for advancing cursor to the next value.
 *
 * Returned promise will be resolved once iteration has successfully completed
 * (there are no more items remaining in the cursor), or rejected on a database
 * error, or if closure throws.
 */
function iterate(store, ...args) {
    const f = args.pop()

    return new Promise((resolve, reject) => {
        const req = store.openCursor(...args)
        req.onerror = err => reject(err)
        req.onsuccess = event => {
            const cursor = event.target.result
            if (cursor) {
                try {
                    f(cursor, cursor.value, reject)
                } catch (err) {
                    reject(err)
                }
            } else {
                resolve()
            }
        }
    })
}

let DATABASE = null

/**
 * Management of and access to the persistence database.
 */
export class PersistDB {
    /**
     * Open the database.
     */
    static async open() {
        if (DATABASE !== null) return DATABASE

        const req = window.indexedDB.open(DB_NAME, DB_VERSION)
        req.onupgradeneeded = upgrade

        const db = await promisify(req)

        /* eslint-disable-next-line require-atomic-updates */
        DATABASE = new PersistDB(db)

        return DATABASE
    }

    /**
     * Load a document.
     *
     * This is a convenience wrapper around {@link #open}
     * and {@link #openDocument}.
     */
    static load(id) {
        return PersistDB.open().then(db => db.openDocument(id))
    }

    /**
     * Export contents of this database as a JS object.
     *
     * Returned object can later be used to import data into a database using
     * {@link #import}. It contains only plain JS values and can safely be
     * converted to/from JSON.
     */
    async export() {
        const tx = this.database.transaction(
            this.database.objectStoreNames, 'readonly')

        const insert = {}
        const objectStores = {}

        for (const name of this.database.objectStoreNames) {
            const store = tx.objectStore(name)
            const indexes = Object.fromEntries(Array.from(store.indexNames)
                .map(name => {
                    const index = store.index(name)
                    return [name, {
                        name: index.name,
                        keyPath: index.keyPath,
                        multiEntry: index.multiEntry,
                        unique: index.unique,
                    }]
                }))

            insert[name] = await promisify(store.getAll())

            objectStores[name] = {
                indexes,
                keyPath: store.keyPath,
                autoIncrement: store.autoIncrement,
            }
        }

        return {
            database: {
                name: this.database.name,
                version: this.database.version,
                objectStores,
            },
            remove: Object.fromEntries(
                Array.from(this.database.objectStoreNames).map(st => [st, {}])),
            insert,
        }
    }

    /**
     * Import data into this database.
     */
    async import(data) {
        const { database: { name, version }, remove = {}, insert = {} } = data

        if (name !== this.database.name) {
            throw new Error(
                `Cannot import data for database ${name} into potentially \
                incompatible database ${this.database.name}`)
        }
        if (version !== this.database.version) {
            throw new Error(
                `Imported data is in an incompatible format ${version} (this \
                database uses ${this.database.version}`)
        }

        const tx = this.database.transaction(
            this.database.objectStoreNames, 'readwrite')

        for (const [name, { key, index }] of Object.entries(remove)) {
            const store = tx.objectStore(name)
            const keys = key && (key instanceof Array ? key : [key])

            if (index && keys) {
                for (const key of keys) {
                    await iterate(store.index(index), key, cursor => {
                        cursor.delete()
                        cursor.continue()
                    })
                }
            } else if (keys) {
                for (const key of keys) {
                    await store.delete(key)
                }
            } else {
                await store.clear()
            }
        }

        for (const [name, values] of Object.entries(insert)) {
            const store = tx.objectStore(name)

            for (const val of values) {
                await promisify(store.add(val))
            }
        }
    }

    constructor(db) {
        this.database = db
    }

    /**
     * Open a document.
     */
    async openDocument(id) {
        const tx = this.database.transaction(['states', 'changes'])
        const store = tx.objectStore('states')
        const document = new DocumentDB(this.database, id)
        const data = await promisify(store.get(id))

        if (!data) {
            return document
        }

        const index = tx.objectStore('changes').index('document')
        const count = await promisify(index.count(id))
        document.dirty = count > 0
        document.version = data.version

        return document
    }

    /**
     * Get a list of all modules with local unsaved changes.
     */
    async dirty() {
        const tx = this.database.transaction(
            ['states', 'changes', 'contents'], 'readwrite')
        const states = tx.objectStore('states')
        const changes = tx.objectStore('changes').index('document')
        const contents = tx.objectStore('contents')

        const dirty = []

        await iterate(states, async (cursor, value, reject) => {
            const count = await promisify(changes.count(value.id))

            if (count === 0) {
                Promise.all([
                    cursor.delete(),
                    contents.delete(value.id),
                ].map(promisify)).catch(reject)
            } else {
                dirty.push(value)
            }

            cursor.continue()
        })

        return dirty
    }

    /**
     * Discard any saved changes to a document.
     *
     * This has the same effect as calling @{link DocumentDB#discard} on
     * a loaded document.
     */
    async discard(id) {
        await new DocumentDB(this.database, id).discard()
    }
}

/**
 * Local state of a document.
 */
export class DocumentDB {
    constructor(db, id) {
        this.database = db
        this.id = id
        this.dirty = false
        this.version = null
    }

    /**
     * Save a new version of a document.
     */
    async save(value, version) {
        const tx = this.database.transaction(
            ['states', 'changes', 'contents'], 'readwrite')
        const states = tx.objectStore('states')
        const changes = tx.objectStore('changes').index('document')
        const contents = tx.objectStore('contents')

        await iterate(changes, this.id, cursor => {
            cursor.delete()
            cursor.continue()
        })

        const content = value.toJS({
            preserveKeys: true,
        })

        await Promise.all([
            states.put({
                id: this.id,
                version,
            }),
            contents.put({
                id: this.id,
                content,
            }),
        ].map(promisify))

        this.version = version
    }

    /**
     * Mark a change to the document.
     */
    async mark(op) {
        const tx = this.database.transaction('changes', 'readwrite')
        const store = tx.objectStore('changes')

        const operation = op.toJS()
        if (op.type === 'insert_node' && op.node.object === 'block') {
            // We need to keep the same key for inserted nodes so xrefs targets
            // are still valid after refreshing page.
            operation.node.key = op.node.key
        }
        await promisify(store.add({
            document: this.id,
            change: operation,
        }))
    }

    /**
     * Restore document from its saved state.
     */
    async restore() {
        const tx = this.database.transaction(['contents', 'changes'])
        const contents = tx.objectStore('contents')
        const changes = tx.objectStore('changes').index('document')

        const [value, ops] = await Promise.all([
            promisify(contents.get(this.id)),
            promisify(changes.getAll(this.id)),
        ])

        return new Seq(ops)
            .map(op => Operation.fromJSON(op.change))
            .reduce(
                (value, op) => op.apply(value), Value.fromJSON(value.content))
    }

    /**
     * Discard any saved changes to a document.
     */
    async discard() {
        const tx = this.database.transaction(
            ['states', 'changes', 'contents'], 'readwrite')
        const states = tx.objectStore('states')
        const changes = tx.objectStore('changes').index('document')
        const contents = tx.objectStore('contents')

        await Promise.all([
            iterate(changes, this.id, cursor => {
                cursor.delete()
                cursor.continue()
            }),
            promisify(states.delete(this.id)),
            promisify(contents.delete(this.id)),
        ])

        this.dirty = false
    }
}

// Schema:
//
// - states: Object
//   State of all opened documents.
//
//   - id: String
//     Document's identificator in backend.
//
//   - version: ?
//     Document's version when it was last loaded.
//
// - changes: Object
//
//   - document: String
//     ID of a document to which this change was applied.
//
//   - order: Number
//
//   - change: JS<Change>
//     Serialized change.
//
//   Index on |document|.
//
// - contents: Object
//   We keep it separate from |states| to allow querying it without copying
//   potentially huge serialized document.
//
//   - id: String
//     Document's identificator in backend.
//
//   - content: JS<Value>
//     Document's contents at the time it was last loaded.
/* eslint-disable func-names */
const MIGRATIONS = [
    // A dummy migration to fill index 0. It will never be executed, since
    // database versions start at 1 (0 is the “version” before first migration,
    // when database is created).
    /* eslint-disable-next-line no-empty-function */
    function() {},
    // 0 → 1
    function(db) {
        db.createObjectStore('states', { keyPath: 'id' })
        db.createObjectStore('contents', { keyPath: 'id' })

        const changes = db.createObjectStore('changes', {
            keyPath: 'order',
            autoIncrement: true,
        })
        changes.createIndex('document', 'document', {
            unique: false,
            multiEntry: true,
        })
    },
]
/* eslint-enable func-names */

function upgrade(event) {
    const { newVersion, oldVersion } = event
    const { result: db, transaction: tx } = event.target

    if (newVersion === null || tx === null) {
        // We're being deleted.
        return
    }

    for (let ver=oldVersion+1 ; ver<=newVersion ; ++ver) {
        MIGRATIONS[ver](db, tx)
    }
}
