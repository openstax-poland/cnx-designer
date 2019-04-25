// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

export default function onKeyDown(event, change, next) {
    switch (event.key) {
    case 'Enter':
        return onEnter(event, change) || next()

    case 'Tab':
        return onTab(event, change) || next()

    case 'Backspace':
        return onBackspace(event, change) || next()

    default:
        return next()
    }
}

function onEnter(event, change) {
    // Pressing shift should disable any special key handling
    if (event.shiftKey) {
        return
    }

    const { value } = change
    const { selection } = value
    const block = value.startBlock

    // In a definition.
    const definition = change.getActiveDefinition(change.value)
    if (!definition) return

    const item = definition.getParent(block.key)

    if (block.type === 'definition_term' && item.type !== 'definition_seealso') {
        return change.moveToStartOfNextBlock()
    }

    if (item.type === 'definition_example') {
        // Only handle key if selection is in an empty block
        if (block.text.length) {
            return
        }

        return change.unwrapBlock('definition_example')
    }

    return
}

function onTab(event, change) {
    const meaning = change.getActiveMeaning(change.value)
    if (!meaning) return

    event.preventDefault()

    return change.insertExample()
}

function onBackspace(event, change) {
    // In a definition.
    const definition = change.getActiveDefinition(change.value)
    if (!definition) return

    const { value } = change
    const { startBlock, selection } = value

    const parent = definition.getParent(startBlock.key)

    // Remove empty meanings
    if (parent && parent.type === 'definition_meaning') {
        const isEmpty = selection.isCollapsed
        && selection.start.isAtStartOfNode(startBlock)
        && selection.end.isAtStartOfNode(startBlock)
        && startBlock.getText().replace(/\s+/g, '') === ''

        if (isEmpty) return change.removeNodeByKey(parent.key)
    }

    return
}
