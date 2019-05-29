// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

export default function onKeyDown(event, change, next) {
    switch (event.key) {
    case 'Enter':
        return onEnter(event, change) || next()

    case 'Backspace':
        return onBackspace(event, change) || next()

    default:
        return next()
    }
}

function onEnter(event, change) {
    // Pressing shift should disable any special key handling
    if (event.shiftKey) {
        return false
    }

    const { value } = change
    const { selection } = value
    const block = value.startBlock

    // In a definition.
    const definition = change.getActiveDefinition(change.value)
    if (!definition) return false

    const item = definition.getParent(block.key)

    if (block.type === 'definition_term' && item.type !== 'definition_seealso') {
        change.moveToStartOfNextBlock()
        return true
    }

    if (item.type === 'definition_example') {
        // Only handle key if selection is in an empty block or at the beggining.
        const isEmpty = selection.isCollapsed
            && selection.start.isAtStartOfNode(block)
            && selection.end.isAtEndOfNode(block)
        if (!isEmpty && selection.start.offset > 0) return false

        change.unwrapBlock('definition_example')
        return true
    }

    if (item.type === 'definition_meaning') {
        // Only handle key if selection is in an empty block or at the beggining.
        const isEmpty = selection.isCollapsed
            && selection.start.isAtStartOfNode(block)
            && selection.end.isAtEndOfNode(block)
        if (!isEmpty && selection.start.offset > 0) return false

        change.unwrapBlock('definition_meaning')
        return true
    }

    return false
}

function onBackspace(event, change) {
    // In a definition.
    const definition = change.getActiveDefinition(change.value)
    if (!definition) return false

    const { value } = change
    const { startBlock, selection } = value

    const parent = definition.getParent(startBlock.key)

    // Remove empty meanings
    if (parent && parent.type === 'definition_meaning') {
        const isEmpty = selection.isCollapsed
        && selection.start.isAtStartOfNode(startBlock)
        && selection.end.isAtStartOfNode(startBlock)
        && startBlock.getText().replace(/\s+/g, '') === ''

        if (isEmpty) {
            change.removeNodeByKey(parent.key)
            return true
        }
    }

    return false
}
