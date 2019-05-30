// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

export default function onKeyDown(event, change, next) {
    switch (event.key) {
    case 'Enter':
        return onEnter(event, change) || next()

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

        if (item.nodes.some(n => n.type === 'definition_example')) {
            // If meaning have examples then remove empty line and
            // add new meaning after current one.
            change.withoutNormalizing(() => {
                change.removeNodeByKey(block.key)
                change.addMeaningToDefinition()
            })
        } else {
            change.unwrapBlock('definition_meaning')
        }
        return true
    }

    return false
}
