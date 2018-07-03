/**
 * Remove all marks from current selection.
 *
 * @param {Slate~Change} change
 */
export function removeMarks(change) {
    for (const mark of change.value.marks) {
        change.removeMarks(mark)
    }
}
