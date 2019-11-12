// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Block, Range, Text } from 'slate'

/**
 * @name MediaDescription
 * @type object
 *
 * @property {string} mime
 * @property {string} name
 * @property {string} alt
 */

/**
 * Create and insert a new figure, with {@code media} as its content.
 *
 * @param {Slate~Change} change
 * @param {MediaDescription} media
 */
export function insertFigure(change, media) {
    const mediaNode = Block.create({
        type: media.mime.split('/', 1)[0],
        data: { src: media.name, mime: media.mime },
    })
    const media_node = Block.create({
        type: 'media',
        nodes: [mediaNode],
        data: { alt: media.alt },
    })

    const figure = Block.create({
        type: 'figure',
        nodes: [media_node],
    })

    change.insertBlock(figure)
    change.moveToStartOfNode(change.value.document.getNode(figure.key))
}

/**
 * Create and insert a new sub-figure, with {@code media} as its content.
 *
 * Fails if no figure is selected.
 *
 * @param {Slate~Change} change
 * @param {MediaDescription} media
 */
export function insertSubfigure(change, media) {
    const { value } = change
    const node = change.getActiveFigure(value)

    if (node === null) {
        // No figure is selected.
        return
    }

    if (node.nodes.first().type !== 'figure') {
        // Figure has no sub-figures yet, convert its child into a sub-figure.
        change.wrapBlockAtRange(
            Range.create().moveToRangeOfNode(node),
            'figure',
        )
    }

    const mediaNode = Block.create({
        type: media.mime.split('/', 1)[0],
        data: { src: media.name, mime: media.mime },
    })

    const media_node = Block.create({
        type: 'media',
        nodes: [mediaNode],
        data: { alt: media.alt },
    })

    const subfigure = Block.create({
        type: 'figure',
        nodes: [media_node],
    })

    const index = node.nodes.last().type === 'figure_caption'
        ? node.nodes.size - 1
        : node.nodes.size
    change.insertNodeByKey(node.key, index, subfigure)
}

/**
 * Add caption to the inner-most selected figure which does not yet have one.
 *
 * @param {Slate~Change} change
 */
export function insertCaption(change) {
    const document = change.value.document

    let node = change.value.blocks.first()
    for (; node ; node = document.getParent(node.key)) {
        if (node.type !== 'figure') continue
        if (node.nodes.last().type === 'figure_caption') continue

        // We can't rely on normalization to add this text block, as it will run
        // after our call to moveToStartOfNode.
        const caption_text = Text.create()
        const caption = Block.create({
            type: 'figure_caption',
            nodes: [caption_text],
        })

        const index = node.nodes.size
        change.insertNodeByKey(node.key, index, caption)
        change.moveToStartOfNode(caption)

        break
    }
}
