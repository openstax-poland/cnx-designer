import { NODE_DATA_INVALID } from 'slate-schema-violations'

function normalizeMedia(change, error) {
    const { code: violation, key, node } = error

    switch (violation) {
    case NODE_DATA_INVALID:
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
