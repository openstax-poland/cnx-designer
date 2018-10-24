/**
 * Change type of the selected list.
 *
 * @param {Slate~Change} change
 * @param {string} type
 */
export function changeListType(change, type) {
    const node = change.getCurrentList(change.value)

    if (node === null) {
        change.wrapInList(type)
    } else {
        change.setNodeByKey(node.key, type)
    }
}
