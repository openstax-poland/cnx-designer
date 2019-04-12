// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Text, Block } from 'slate'

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
        nodes: [Text.create()]
    })
    const meaning = Block.create({
        type: 'definition_meaning',
        nodes: [para]
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
}

/**
 * Insert meaning. It works only if selection is inside definition.
 *
 * @param {Slate~Change} change
 */
export function insertMeaning(change) {
    const definition = change.getActiveDefinition(change.value)

    if (!definition) return null

    const text = Text.create()
    const para = Block.create({
        type: 'paragraph',
        nodes: [text]
    })
    const meaning = Block.create({
        type: 'definition_meaning',
        nodes: [para],
    })

    const index = definition.nodes.size
        + (definition.nodes.last().type === 'definition_seealso' ? -1 : 0)

    change.insertNodeByKey(definition.key, index, meaning)
    change.moveToStartOfNode(meaning)
}

/**
 * Insert example. It works only if selection is inside meaning.
 *
 * @param {Slate~Change} change
 */
export function insertExample(change) {
    const meaning = change.getActiveMeaning(change.value)
    if (!meaning) return null

    const definition = change.getActiveDefinition(change.value)
    if (!definition) return null

    const text = Text.create()
    const para = Block.create({
        type: 'paragraph',
        nodes: [text],
    })
    const example = Block.create({
        type: 'definition_example',
        nodes: [para],
    })

    const index = definition.getPath(meaning.key).toArray().pop() + 1
    change.insertNodeByKey(definition.key, index, example)
    change.moveToStartOfNode(example)
}

/**
 * Insert See Also at the end of definition.
 *
 * @param {Slate~Change} change
 */
export function insertSeeAlso(change) {
    const definition = change.getActiveDefinition(change.value)

    if (definition == null || definition.nodes.last().type === 'definition_seealso') return

    const term = Block.create({
        type: 'definition_term',
        nodes: [Text.create()],
    })
    const seealso = Block.create({
        type: 'definition_seealso',
        nodes: [term],
    })

    change.insertNodeByKey(definition.key, definition.nodes.size, seealso)
    change.moveToStartOfNode(seealso)
}
