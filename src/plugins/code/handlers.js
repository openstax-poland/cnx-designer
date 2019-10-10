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

    const code = value.startBlock && value.startBlock.type === 'code'
    if (!code) return false

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
        return change.unwrapBlock('code')
    }

    return change.insertText('\n')
}

function onBackspace(event, change) {
    const { value } = change

    const code = value.startBlock.type === 'code' ? value.startBlock : null
    if (!code) return false

    const { selection } = value

    const isAtStart = selection.start.isAtStartOfNode(code)
        && selection.end.isAtStartOfNode(code)

    if (isAtStart) {
        // Split code block at first \n
        const texts = code.getText().split(/\r?\n/)
        change.removeNodeByKey(code.key)
        const firstText = texts.shift()
        change.insertText(firstText)
        if (texts.length) {
            change.insertBlock('code')
            change.insertText(texts.join('\n'))
        }
        change.moveToEndOfPreviousBlock()
        return change.moveBackward(firstText.length)
    }

    return false
}
