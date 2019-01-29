// Copyright 2018 OpenStax Poland
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

function onEnter(_, change) {
    const { value } = change
    const { selection, startBlock } = value

    if (startBlock.type === 'figure_caption' && selection.end.isAtEndOfNode(startBlock)) {
        return change.moveForward()
    }

    return
}
