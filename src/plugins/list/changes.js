/**
 * Change type of the selected list.
 *
 * @param {Slate~Change} change
 * @param list
 * @param {string} type
 */
export function changeListType(change, list, type) {
    const node = list.utils.getCurrentList(change.value)

    if (node === null) {
        change.call(list.changes.wrapInList, type)
    } else {
        change.setNodeByKey(node.key, type)
    }
}

export default ({ list }) => ({
    changeListType: (change, type) => changeListType(change, list, type),
})
