// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

export default function onKeyDown(event, editor, next) {
    switch (event.key) {
    case 'Enter':
        return onEnter(event, editor) || next()

    default:
        return next()
    }
}

function onEnter(event, editor) {
    // Pressing shift should disable any special key handling
    if (event.shiftKey) {
        return false
    }

    const { value } = editor
    const { selection } = value
    const block = value.startBlock

    // Only handle key if selection is in an empty block, or at a beginning
    // of a block, ...
    const isEmpty = selection.isCollapsed
        && selection.start.isAtStartOfNode(block)
        && selection.end.isAtEndOfNode(block)
    if (!isEmpty && selection.start.offset > 0) return false

    // ... in a rule.
    const rule = editor.getActiveRule(editor.value)
    if (!rule) return false

    const item = rule.getParent(block.key)
    const isItemLast = rule.getNextSibling(item.key) === null
    const atStartOfItem = item.getPreviousBlock(block.key) === null

    // Splitting here would create an empty item, ...
    if (atStartOfItem) {
        // ... but since this is the last item we can just unwrap it.
        if (isItemLast) {
            editor.unwrapNodeByKey(item.key)
            return true
        }

        // Otherwise we do nothing.
        return true
    }

    // Otherwise split current block, and let schema normalizations do the rest.
    editor.splitNodeByKey(item.key, item.nodes.indexOf(block))

    return true
}
