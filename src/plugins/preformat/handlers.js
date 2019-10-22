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
    const { value } = change

    const preformat = value.startBlock && value.startBlock.type === 'preformat'
    if (!preformat) return false

    // Add new line
    if (event.shiftKey) {
        return change.insertText('\n')
    }

    const { selection, startBlock } = value

    const isAtEnd = selection.start.isAtEndOfNode(startBlock)
        && selection.end.isAtEndOfNode(startBlock)

    const lastNodeIsEmpty = startBlock.getText()
        .split(/\r?\n/)
        .pop() === ''

    // Add new paragraph and unwrap block
    if (isAtEnd && lastNodeIsEmpty) {
        change.deleteBackward()
        change.insertBlock('paragraph')
        return change.unwrapBlock('preformat')
    }

    return change.insertText('\n')
}

function onBackspace(event, change) {
    const { value } = change

    const preformat = value.startBlock.type === 'preformat'
        ? value.startBlock
        : null

    if (!preformat) return false

    const { selection } = value

    const isAtStart = selection.start.isAtStartOfNode(preformat)
        && selection.end.isAtStartOfNode(preformat)

    if (isAtStart) {
        // Split preformat block at first \n
        const texts = preformat.getText().split(/\r?\n/)
        change.removeNodeByKey(preformat.key)
        const firstText = texts.shift()
        change.insertText(firstText)
        if (texts.length) {
            change.insertBlock('preformat')
            change.insertText(texts.join('\n'))
        }
        change.moveToEndOfPreviousBlock()
        return change.moveBackward(firstText.length)
    }

    return false
}
