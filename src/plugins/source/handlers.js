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

    const sourceBlock = value.startBlock && value.startBlock.type === 'source_element'
    const sourceInline = value.startInline && value.startInline.type === 'source_element'
    if (!sourceBlock && !sourceInline) return

    // Add new line
    if (event.shiftKey) {
        return change.insertText('\n')
    }

    const { selection, startBlock, startInline } = value

    let isAtEnd = false
    let lastNodeIsEmpty = false

    if (sourceBlock) {
        isAtEnd = selection.start.isAtEndOfNode(startBlock)
        && selection.end.isAtEndOfNode(startBlock)

        const lastNode = startBlock.getText().split(/\r?\n/).pop()
        lastNodeIsEmpty = lastNode.replace(/\s+/, '').replace(/\s+/g, '') === ''
    } else if (sourceInline) {
        isAtEnd = selection.start.isAtEndOfNode(startInline)
        && selection.end.isAtEndOfNode(startInline)

        const lastNode = startInline.getText().split(/\r?\n/).pop()
        lastNodeIsEmpty = lastNode.replace(/\s+/, '').replace(/\s+/g, '') === ''
    }

    // Add new paragraph and unwrap block 
    if (isAtEnd && lastNodeIsEmpty) {
        // remove last \n
        change.deleteBackward()
        change.insertBlock('paragraph')
        if (sourceBlock) {
            return change.unwrapBlock('source_element')
        } else if (sourceInline) {
            return change.unwrapInline('source_element')
        }
    }

    return change.insertText('\n')
}

function onBackspace(event, change) {
    const { value } = change

    const sourceBlock = value.startBlock && value.startBlock.type === 'source_element'
    const sourceInline = value.startInline && value.startInline.type === 'source_element'
    if (!sourceBlock && !sourceInline) return

    const { selection, startBlock, startInline } = value

    let isAtStart = false
    
    if (sourceBlock) {
        isAtStart = selection.start.isAtStartOfNode(startBlock)
        && selection.end.isAtStartOfNode(startBlock)
    } else if (sourceInline) {
        isAtStart = selection.start.isAtStartOfNode(startInline)
        && selection.end.isAtStartOfNode(startInline)
    }

    if (isAtStart) {
        // Split source_element at first \n
        let texts = ['']
        if (sourceBlock) {
            texts = startBlock.getText().split(/\r?\n/)
            change.removeNodeByKey(startBlock.key)
        } else if (sourceInline) {
            texts = startInline.getText().split(/\r?\n/)
            change.removeNodeByKey(startInline.key)
        }
        
        const firstText = texts.shift()
        change.insertText(firstText)

        if (texts.length) {
            if (sourceBlock) {
                change.insertBlock('source_element')
            } else if (sourceInline) {
                change.insertInline('source_element')
            }
            change.insertText(texts.join('\n'))
        }
        change.moveToEndOfPreviousBlock()
        return change.moveBackward(firstText.length)
    }

    return
}