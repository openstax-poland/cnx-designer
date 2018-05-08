import {
    CHILD_UNKNOWN,
    PARENT_TYPE_INVALID,
} from 'slate-schema-violations'


function normalizeFigure(change, violation, context) {
    const { child } = context

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


function normalizeCaption(change, violation, context) {
    const { node } = context

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
                { types: ['figure', 'media'], min: 1 },
                { types: ['figure_caption'], min: 0, max: 1 },
            ],
            normalize: normalizeFigure,
            counters: {
                figure: 'enter',
            },
        },
        figure_caption: {
            parent: { types: ['figure'] },
            normalize: normalizeCaption,
        },
    },
}
