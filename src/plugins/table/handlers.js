// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

export default function onKeyDown(event, change, next) {
    switch (event.key) {
    case 'Backspace':
        return onBackspace(event, change) || next()

    case 'Delete':
        return onDelete(event, change) || next()

    default:
        return next()
    }
}

function onBackspace(event, change) {
    const { value } = change

    const entry = change.getActiveTableNode('table_entry')

    if (!entry) return false

    const { selection } = value

    const isAtStart = selection.start.isAtStartOfNode(entry)
        && selection.end.isAtStartOfNode(entry)

    if (isAtStart) {
        return true
    }

    return false
}

function onDelete(event, change) {
    const { value } = change

    const entry = change.getActiveTableNode('table_entry')

    if (!entry) return false

    const { selection } = value

    const isAtEnd = selection.start.isAtEndOfNode(entry)
        && selection.end.isAtEndOfNode(entry)

    if (isAtEnd) {
        return true
    }

    return false
}
