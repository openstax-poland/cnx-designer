import { Editor, Element, Operation } from 'slate'

import { uuid } from './util'

/** Set of all IDs currently present in an editor */
const ID_MAP: WeakMap<Editor, Set<string>> = new WeakMap()

/**
 * Augment an editor with an ID manager
 *
 * The ID manager will ensure that each {@link Element} has a document-unique
 * property {@code id: string}.
 */
export function withIds<T extends Editor>(editor: T): T {
    const { apply: oldApply } = editor

    editor.apply = apply.bind(null, oldApply, editor)

    return editor
}

function apply(apply: (op: Operation) => void, ed: Editor, op: Operation) {
    let ids = ID_MAP.get(ed)

    if (ids == null) {
        ID_MAP.set(ed, ids = new Set())
    }

    let add, remove

    switch (op.type) {
    case 'insert_node':
        if (Element.isElement(op.node)
        && (!('id' in op.node) || typeof op.node.id !== 'string' || ids.has(op.node.id))) {
            op.node.id = generateId()
        }
        add = op.node.id as string
        break

    case 'merge_node':
        if ('id' in op.properties && typeof op.properties.id === 'string') {
            remove = op.properties.id
        }
        break

    case 'remove_node':
        if ('id' in op.node && typeof op.node.id === 'string') {
            remove = op.node.id
        }
        break

    case 'set_node':
        if ('id' in op.properties && typeof op.properties.id === 'string') {
            remove = op.properties.id
        }
        if ('id' in op.newProperties) {
            if (typeof op.newProperties.id !== 'string') {
                throw new Error(`${op.newProperties.id} is not a valid ID`)
            }
            if (ids.has(op.newProperties.id)) {
                throw new Error(`a node with ID ${op.newProperties.id} already exists`)
            }
            add = op.properties.id as string
        }
        break

    case 'split_node':
        if ('id' in op.properties) {
            op.properties.id = generateId()
        }
        break

    default:
        break
    }

    apply(op)

    if (remove != null) {
        ids.delete(remove)
    }

    if (add != null) {
        ids.add(add)
    }
}

/** Generate a new, random ID */
function generateId(): string {
    return `UUID${uuid.v4()}`
}
