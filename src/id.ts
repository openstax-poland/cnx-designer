import { Editor, Element, Node, Operation } from 'slate'

import { uuid } from './util'

/** Set of all IDs currently present in an editor */
const ID_MAP: WeakMap<Editor, Set<string>> = new WeakMap()

export interface IdEditor extends Editor {
    generateID: () => string
}

/**
 * Augment an editor with an ID manager
 *
 * The ID manager will ensure that each {@link Element} has a document-unique
 * property {@code id: string}.
 */
export function withIds<T extends Editor>(editor: T): T & IdEditor {
    const ed = editor as T & IdEditor
    const { apply: oldApply } = ed

    ed.generateID = generateID
    ed.apply = apply.bind(null, oldApply, ed)

    return ed
}

function apply(apply: (op: Operation) => void, ed: IdEditor, op: Operation) {
    let ids = ID_MAP.get(ed)

    if (ids == null) {
        ID_MAP.set(ed, ids = collectIds(ed))
    }

    const add: string[] = []
    const remove: string[] = []

    switch (op.type) {
    case 'insert_node':
        walk(op.node, el => {
            if (!('id' in el) || typeof el.id !== 'string' || ids!.has(el.id)) {
                el.id = ed.generateID()
            }
            add.push(el.id as string)
        })
        break

    case 'merge_node':
        if ('id' in op.properties && typeof op.properties.id === 'string') {
            remove.push(op.properties.id)
        }
        break

    case 'remove_node':
        walk(op.node, el => {
            if ('id' in el && typeof el.id === 'string') {
                remove.push(el.id)
            }
        })
        break

    case 'set_node':
        if ('id' in op.properties && typeof op.properties.id === 'string') {
            remove.push(op.properties.id)
        }
        if ('id' in op.newProperties) {
            if (typeof op.newProperties.id !== 'string') {
                throw new Error(`${op.newProperties.id} is not a valid ID`)
            }
            if (ids.has(op.newProperties.id)) {
                throw new Error(`a node with ID ${op.newProperties.id} already exists`)
            }
            add.push(op.properties.id as string)
        }
        break

    case 'split_node':
        if ('id' in op.properties) {
            op.properties.id = ed.generateID()
            add.push(op.properties.id as string)
        }
        break

    default:
        break
    }

    apply(op)

    for (const id of remove) {
        ids.delete(id)
    }

    for (const id of add) {
        ids.add(id)
    }
}

/** Generate a new, random ID */
function generateID(): string {
    return `UUID${uuid.v4()}`
}

function walk(node: Node, callback: (element: Element) => void) {
    if (Element.isElement(node)) {
        callback({ ...node })

        for (const child of node.children) walk(child, callback)
    }
}

function collectIds(editor: Editor): Set<string> {
    return new Set(Array.from(Editor.nodes(editor, {
        at: [[0], [editor.children.length]],
        match: node => Element.isElement(node) && 'id' in node && typeof node.id === 'string',
    }), ([node]) => node.id as string))
}
