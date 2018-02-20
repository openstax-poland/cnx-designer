export function removeMarks(change) {
    for (const mark of change.value.marks) {
        change.removeMark(mark)
    }
    return change
}
