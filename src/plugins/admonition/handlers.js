export default function onKeyDown(event, change, next) {
    switch (event.key) {
    case 'Enter':
        return onEnter(event, change) || next()

    default:
        return next()
    }
}

function onEnter(event, change) {
    // Shift disables special handling
    if (event.shiftKey) {
        return
    }

    const { value } = change
    const { selection, startBlock } = value

    // Only handle key if selection is in an empty block, or at a beginning
    // of a block, ...
    const isEmpty = selection.isCollapsed
        && selection.start.isAtStartOfNode(startBlock)
        && selection.end.isAtStartOfNode(startBlock)
    if (!isEmpty && selection.start.offset > 0) {
        return
    }

    // ... in an admonition
    const admonition = change.getActiveAdmonition(value)
    if (!admonition) return

    return change.unwrapBlock('admonition')
}
