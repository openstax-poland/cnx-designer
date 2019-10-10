// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Block, Text } from 'slate'

/**
 * Insert definition before or after selected block.
 *
 * @param {Slate~Change} change
 * @param {before|after} [position=after]
 */
export function insertDefinition(change, position = 'after') {
    const value = change.value
    const document = value.document
    const block = value.startBlock

    const term = Block.create('definition_term')
    const para = Block.create({
        type: 'paragraph',
        nodes: [Text.create()],
    })
    const meaning = Block.create({
        type: 'definition_meaning',
        nodes: [para],
    })
    const definition = Block.create({
        type: 'definition',
        nodes: [term, meaning],
    })

    let index = document.getPath(block.key).toArray()[0]
    if (position === 'after') {
        index++
    }

    change.insertNodeByKey(document.key, index, definition)
    change.moveTo(term.key)
    return true
}

/**
 * Insert meaning. It works only if selection is inside definition.
 *
 * @param {Slate~Change} change
 */
export function addMeaningToDefinition(change) {
    const definition = change.getActiveDefinition(change.value)

    if (!definition) return false

    const text = Text.create()
    const para = Block.create({
        type: 'paragraph',
        nodes: [text],
    })
    const meaning = Block.create({
        type: 'definition_meaning',
        nodes: [para],
    })

    // Get index of closest meaning and insert new one after.
    const startBlock = change.value.startBlock
    const closestMeaning = definition.getClosest(
        startBlock.key, n => n.type === 'definition_meaning')
    let index
    if (closestMeaning) {
        const meaningIndex = definition.nodes.findIndex(
            n => n.key === closestMeaning.key)
        index = meaningIndex + 1
    } else {
        index = definition.nodes.size
            + (definition.nodes.last().type === 'definition_seealso' ? -1 : 0)
    }

    change.insertNodeByKey(definition.key, index, meaning)
    change.moveToStartOfNode(meaning)
    return true
}

/**
 * Insert example. It works only if selection is inside meaning.
 *
 * @param {Slate~Change} change
 */
export function addExampleToMeaning(change) {
    const meaning = change.getActiveDefinitionMeaning(change.value)
    if (!meaning) return false

    const text = Text.create()
    const para = Block.create({
        type: 'paragraph',
        nodes: [text],
    })
    const example = Block.create({
        type: 'definition_example',
        nodes: [para],
    })

    change.insertNodeByKey(meaning.key, meaning.nodes.size, example)
    change.moveToStartOfNode(example)
    return true
}

/**
 * Insert See Also at the end of definition.
 *
 * @param {Slate~Change} change
 */
export function addSeeAlsoToDefinition(change) {
    const definition = change.getActiveDefinition(change.value)

    if (definition == null) return false

    const term = Block.create({
        type: 'definition_term',
        nodes: [Text.create()],
    })

    // If there is already See Also then user just want to add another term.
    const last = definition.nodes.last()
    if (last.type === 'definition_seealso') {
        change.insertNodeByKey(last.key, last.nodes.size, term)
        change.moveToStartOfNode(term)
        return true
    }

    const seealso = Block.create({
        type: 'definition_seealso',
        nodes: [term],
    })

    change.insertNodeByKey(definition.key, definition.nodes.size, seealso)
    change.moveToStartOfNode(seealso)
    return true
}
