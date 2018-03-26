import * as utils from './utils'


export default function onKeyDown(event, change, editor) {
    switch (event.key) {
    case 'Enter':
        return onEnter(event, change)
    }
}


function onEnter(event, change) {
    // Pressing shift should disable any special key handling
    if (event.shiftKey) {
        return
    }

    // Only handle key if selection is in an empty block, or at a beginning
    // of a block, ...
    const { value } = change
    const block = value.startBlock
    if (!block.isEmpty && value.startOffset > 0) return

    // ... in an exercise.
    const exercise = utils.getCurrentExercise(value)
    if (!exercise) return

    const item = exercise.getParent(block.key)
    const next = item.getNextBlock(block.key)
    const nextItem = exercise.getNextBlock(item.key)

    // If we're at the very end of an exercise just exit it.
    if (next === null && nextItem === null) {
        const parent = value.document.getParent(exercise.key)
        const index = parent.nodes.indexOf(exercise)
        change.moveNodeByKey(block.key, parent.key, index + 1)
        return change
    }

    // Otherwise split current block (schema normalisation will ensure that the
    // new block gets correct type).
    change.splitNodeByKey(item.key, item.nodes.indexOf(block))
    return change
}
