// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

export default function onKeyDown(event, change, next) {
    switch (event.key) {
    case 'Enter':
        return onEnter(event, change, next)

    default:
        return next()
    }
}

function onEnter(event, change, next) {
    // Shift disables special handling
    if (event.shiftKey) {
        return next()
    }

    const { value } = change
    const { selection, startBlock } = value

    // Only handle key if selection is in an empty block, or at a beginning
    // of a block, ...
    const isEmpty = selection.isCollapsed
        && selection.start.isAtStartOfNode(startBlock)
        && selection.end.isAtStartOfNode(startBlock)
    if (!isEmpty && selection.start.offset > 0) {
        return next()
    }

    // ... in a quotation
    const parent = value.document.getParent(startBlock.key)
    if (!parent || parent.type !== 'quotation') return next()

    return change.unwrapBlock('quotation')
}
