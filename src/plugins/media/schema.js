// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

function normalizeMedia(change, error) {
    const { code: violation, key, node } = error

    switch (violation) {
    case 'node_data_invalid':
        if (key === 'alt') {
            change.setNodeByKey(node.key, {
                data: { alt: 'Cannot be empty' },
            })
        }
        break

    default:
        console.warn("Unhandled media violation", violation)
        break
    }
}

export default {
    blocks: {
        // TODO: do we actually want to keep multiple versions?
        media: {
            nodes: [
                { type: 'image' },
            ],
            data: {
                alt: Boolean,
            },
            normalize: normalizeMedia,
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
