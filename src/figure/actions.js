/** @jsx createMenu */

import { Block, Text } from 'slate'

import createMenu from '../actions'

import AssetSelector from './AssetSelector'


function insertFigure(change, media) {
    const image = Block.create({
        type: media.mime.split('/', 1)[0],
        data: { src: media.name },
    })

    const media_node = Block.create({
        type: 'media',
        nodes: [image],
    })

    // We can't rely on normalization to add this text block, as it will run
    // after our call to collapseToStartOf.
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
    change.collapseToStartOf(caption)
}


function findFigure(value) {
    const path = value.document.getPath(value.blocks.first().key)

    let node = value.document
    for (const index of path) {
        node = node.getNodeAtPath([index])

        if (node.type === 'figure') {
            break
        }
    }

    if (node.type !== 'figure') {
        // Selection is outside any figure
        return null
    }

    return node
}


function insertSubfigure(change, media) {
    const value = change.value
    let node = findFigure(value)

    if (value.blocks.size > 1 && !node.hasDescendant(value.blocks.last())) {
        // Selection is not contained in the figure
        return
    }

    if (node.nodes.first().type !== 'figure') {
        // We can't rely on normalization to add this text block, as it will run
        // after our call to collapseToStartOf.
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
    // after our call to collapseToStartOf.
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


export default <group category="Insert" title="Figure">
    <action
        title="Figure"
        icon="insert_photo"
        action={insertFigure}
        handler={AssetSelector}
        />
    <action
        title="Add subfigure"
        enabled={value => findFigure(value) !== null}
        action={insertSubfigure}
        handler={AssetSelector}
        />
</group>
