import { Editor, Element } from 'slate';
import { uuid } from './util';
/** Set of all IDs currently present in an editor */
const ID_MAP = new WeakMap();
export const IdEditor = {
    /**
     * Invalidate ID cache
     *
     * This function must be called each time `editor.children` are manually
     * updated. It will invalidate the internal ID cache, ensuring it is rebuilt
     * the next time it is needed.
     */
    invalidateIDs(editor) {
        ID_MAP.delete(editor);
    },
};
/**
 * Augment an editor with an ID manager
 *
 * The ID manager will ensure that each {@link Element} has a document-unique
 * property {@code id: string}.
 */
export function withIds(editor) {
    const ed = editor;
    const { apply: oldApply } = ed;
    ed.generateID = generateID;
    ed.apply = apply.bind(null, oldApply, ed);
    return ed;
}
function apply(apply, ed, op) {
    let ids = ID_MAP.get(ed);
    if (ids == null) {
        ID_MAP.set(ed, ids = collectIds(ed));
    }
    const add = [];
    const remove = [];
    switch (op.type) {
        case 'insert_node':
            walk(op.node, el => {
                if (!('id' in el) || typeof el.id !== 'string' || ids.has(el.id)) {
                    el.id = ed.generateID();
                }
                add.push(el.id);
            });
            break;
        case 'merge_node':
            if ('id' in op.properties && typeof op.properties.id === 'string') {
                remove.push(op.properties.id);
            }
            break;
        case 'remove_node':
            walk(op.node, el => {
                if ('id' in el && typeof el.id === 'string') {
                    remove.push(el.id);
                }
            });
            break;
        case 'set_node':
            if ('id' in op.properties && typeof op.properties.id === 'string') {
                remove.push(op.properties.id);
            }
            if ('id' in op.newProperties) {
                if (typeof op.newProperties.id !== 'string') {
                    /* eslint-disable-next-line
                        @typescript-eslint/restrict-template-expressions */
                    throw new Error(`${op.newProperties.id} is not a valid ID`);
                }
                if (ids.has(op.newProperties.id)) {
                    throw new Error(`a node with ID ${op.newProperties.id} already exists`);
                }
                add.push(op.properties.id);
            }
            break;
        case 'split_node':
            if ('id' in op.properties) {
                op.properties.id = ed.generateID();
                add.push(op.properties.id);
            }
            break;
        default:
            break;
    }
    apply(op);
    for (const id of remove) {
        ids.delete(id);
    }
    for (const id of add) {
        ids.add(id);
    }
}
/** Generate a new, random ID */
function generateID() {
    return `UUID${uuid.v4()}`;
}
function walk(node, callback) {
    if (Element.isElement(node)) {
        callback(node);
        for (const child of node.children)
            walk(child, callback);
    }
}
function collectIds(editor) {
    return new Set(Array.from(Editor.nodes(editor, {
        at: [[0], [editor.children.length]],
        match: node => Element.isElement(node) && 'id' in node && typeof node.id === 'string',
    }), ([node]) => node.id));
}
