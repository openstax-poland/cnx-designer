// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Block, Text } from 'slate'

const mediaData = {
    src: s => typeof s === 'string',
    mime: m => typeof m === 'string',
    for: s => s == null || ['default', 'pdf', 'online'],
}

function normalizeMedia(change, error) {
    const { code: violation, node, key } = error

    switch (violation) {
    case 'child_min_invalid':
        if (error.index === 1) {
            change.insertNodeByKey(node.key, 1, Block.create({
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
                change.insertNodeByKey(node.key, 1, Block.create({
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

export default function schema({ inlines }) {
    return {
        blocks: {
            media: {
                nodes: [
                    {
                        match: [
                            { type: 'audio' },
                            { type: 'image' },
                            { type: 'video' },
                        ],
                        min: 1,
                    },
                    { match: { type: 'media_alt' }, min: 1, max: 1 },
                ],
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
            audio: {
                isVoid: true,
                data: mediaData,
            },
            image: {
                isVoid: true,
                data: mediaData,
            },
            video: {
                isVoid: true,
                data: mediaData,
            },
        },
    }
}
