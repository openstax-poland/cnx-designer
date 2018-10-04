import {
    CHILD_UNKNOWN,
    PARENT_TYPE_INVALID,
} from 'slate-schema-violations'

function normalizeFigure(change, error) {
    const { code: violation, child } = error

    switch (violation) {
    // Unwrap invalid nodes outside a figure.
    case CHILD_UNKNOWN:
        change.unwrapNodeByKey(child.key)
        break

    default:
        console.warn("Unhandled figure violation", violation)
        break
    }
}

function normalizeCaption(change, error) {
    const { code: violation, node } = error

    switch (violation) {
    // Replace any caption outside a figure with a simple paragraph.
    case PARENT_TYPE_INVALID:
        change.setNodeByKey(node.key, 'paragraph')
        break

    default:
        console.warn("Unhandled figure caption violation", violation)
        break
    }
}

export default {
    blocks: {
        figure: {
            nodes: [
                // HTMLBook also allows the opposite order, but for simplicity
                // we limit ourselves just to this.
                { match: [{ type: 'figure' }, { type: 'media' }], min: 1 },
                { type: 'figure_caption', min: 0, max: 1 },
            ],
            normalize: normalizeFigure,
            counters: {
                figure: 'enter',
            },
        },
        figure_caption: {
            parent: { type: 'figure' },
            normalize: normalizeCaption,
        },
    },
}
