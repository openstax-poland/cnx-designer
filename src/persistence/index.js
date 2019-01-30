// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Value, Operation } from 'slate'
import { Seq } from 'immutable'

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
        req.onerror = () => reject()
        req.onsuccess = event => {
            const cursor = event.target.result
            if (cursor) {
                f(cursor, cursor.value, reject).catch(reject)
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

        await iterate(changes, this.id, async (cursor, value) => {
            cursor.delete()
            cursor.continue()
        })

        const content = value.toJS({
            preserveKeys: true,
        })

        await Promise.all([
            states.put({
                id: this.id,
                version: version,
            }),
            contents.put({
                id: this.id,
                content: content,
            }),
        ].map(promisify))
    }

    /**
     * Mark a change to the document.
     */
    async mark(op) {
        const tx = this.database.transaction('changes', 'readwrite')
        const store = tx.objectStore('changes')

        await promisify(store.add({
            document: this.id,
            change: op.toJS(),
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
            promisify(changes.getAll()),
        ])

        return new Seq(ops)
            .map(op => Operation.fromJSON(op.change))
            .reduce((value, op) => op.apply(value), Value.fromJSON(value.content))
    }

    /**
     * Discard any saved changes to a document.
     */
    async discard() {
        const tx = this.database.transaction(['states', 'changes', 'contents'], 'readwrite')
        const states = tx.objectStore('states')
        const changes = tx.objectStore('changes').index('document')
        const contents = tx.objectStore('contents')

        await Promise.all([
            iterate(changes, this.id, async (cursor, value) => {
                cursor.delete()
                cursor.continue()
            }),
            promisify(states.delete(this.id)),
            promisify(contents.delete(this.id)),
        ])
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
const MIGRATIONS = [
    // A dummy migration to fill index 0. It will never be executed, since
    // database versions start at 1 (0 is the “version” before first migration,
    // when database is created).
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
