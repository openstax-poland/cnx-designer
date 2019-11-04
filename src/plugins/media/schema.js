// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Block, Text } from 'slate'

function normalizeMedia(change, error) {
    const { code: violation, node, key } = error

    switch (violation) {
    case 'child_min_invalid':
        if (!node.nodes.find(n => n.type === 'media_alt')) {
            change.insertNodeByKey(node.key, node.nodes.size, Block.create({
                type: 'media_alt',
                nodes: [Text.create(node.data.get('alt'))],
            }))
            return
        }
        console.warn("Unhandled media violation", violation)
        break

    case 'node_data_invalid':
        if (key === 'alt') {
            const mediaAlt = node.nodes.find(n => n.type === 'media_alt')
            if (!mediaAlt) {
                change.insertNodeByKey(node.key, node.nodes.size, Block.create({
                    type: 'media_alt',
                    nodes: [Text.create(node.data.get('alt'))],
                }))
            }
            // Remove data alt.
        }
        break

    /* istanbul ignore next */
    default:
        console.warn("Unhandled media violation", violation)
        break
    }
}

export default function schema({ inlines, nodes }) {
    return {
        blocks: {
            // TODO: do we actually want to keep multiple versions?
            media: {
                nodes,
                normalize: normalizeMedia,
            },
            media_alt: {
                nodes: [{
                    match: [
                        ...inlines.map(type => ({ type })),
                        { object: 'text' },
                    ],
                }],
                marks: [],
            },
            // TODO: if we do, add target attribute.
            image: {
                isVoid: true,
                data: {
                    src: Boolean,
                },
            },
        },
    }
}
