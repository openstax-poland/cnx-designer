import { Block, Text } from 'slate'

import * as utils from './utils'

/**
 * @name MediaDescription
 * @type object
 *
 * @property {string} mime
 * @property {string} name
 */

/**
 * Create and insert a new figure, with {@code media} as its content.
 *
 * @param {Slate~Change} change
 * @param {MediaDescription} media
 */
export function insertFigure(change, media) {
    const image = Block.create({
        type: media.mime.split('/', 1)[0],
        data: { src: media.name },
    })
    const media_node = Block.create({
        type: 'media',
        nodes: [image],
    })

    // We can't rely on normalization to add this text block, as it will run
    // after our call to moveToStart.
    const caption_text = Text.create()
    const caption = Block.create({
        type: 'figure_caption',
        nodes: [caption_text],
    })

    const figure = Block.create({
        type: 'figure',
        nodes: [media_node, caption],
    })

    change.insertBlock(figure)
    change.moveToStart(caption)
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
    let node = utils.findFigure(value)

    if (node === null) {
        // No figure is selected.
        return
    }

    if (node.nodes.first().type !== 'figure') {
        // Figure has no sub-figures yet, convert its child into a sub-figure.

        // We can't rely on normalization to add this text block, as it will run
        // after our call to moveToStart.
        const caption_text = Text.create()
        const caption = Block.create({
            type: 'figure_caption',
            nodes: [caption_text],
        })

        const new_ = Block.create({
            type: 'figure',
            nodes: [node, caption],
        })

        change.replaceNodeByKey(node.key, new_)
        node = new_
    }

    const image = Block.create({
        type: media.mime.split('/', 1)[0],
        data: { src: media.name },
    })

    const media_node = Block.create({
        type: 'media',
        nodes: [image],
    })

    // We can't rely on normalization to add this text block, as it will run
    // after our call to moveToStart.
    const caption_text = Text.create()
    const caption = Block.create({
        type: 'figure_caption',
        nodes: [caption_text],
    })

    const subfigure = Block.create({
        type: 'figure',
        nodes: [media_node, caption],
    })

    const index = node.nodes.size - 1
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
        // after our call to moveToStart.
        const caption_text = Text.create()
        const caption = Block.create({
            type: 'figure_caption',
            nodes: [caption_text],
        })

        const index = node.nodes.size
        change.insertNodeByKey(node.key, index, caption)
        change.moveToStart(caption)

        break
    }
}
