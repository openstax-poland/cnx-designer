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


export default <group category="Insert" title="Figure">
    <action
        title="Figure"
        icon="insert_photo"
        action={insertFigure}
        handler={AssetSelector}
        />
</group>
