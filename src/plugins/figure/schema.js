// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

function normalizeFigure(change, error) {
    const { code: violation, node, child, index, count } = error
    const nextIndex = count === 0 ? index : index + 1

    switch (violation) {
    case 'child_required':
        if (node.nodes.first().type === 'figure') {
            change.unwrapBlockByKey(node.nodes.first().key)
        }
        break

    case 'child_min_invalid':
        // Groups are in wrong order.
        if (nextIndex + 1 < node.nodes.size && node.nodes.get(nextIndex).type === 'figure_caption') {
            const child = node.nodes.get(nextIndex)
            change.withoutNormalizing(change => {
                change.removeNodeByKey(child.key)
                change.insertNodeByKey(node.key, node.nodes.size - 1, child)
            })
            return
        }
        // A single sub-figure
        if (index === 0 && count === 1 && node.nodes.first().type === 'figure') {
            const child = node.nodes.first()
            change.unwrapBlockByKey(child.key, 'figure')
            return
        }
        console.warn("Unhandled figure violation", violation)
        break

    case 'child_max_invalid':
        // Two captions.
        if (child.type === 'figure_caption') {
            change.mergeNodeByKey(child.key)
            return
        }
        console.warn("Unhandled figure violation", violation)
        break

    // A child of different type was expected.
    case 'child_type_invalid':
        // A media block can only be marked as invalid type when it's following
        // a subfigure.
        if (child.type === 'media') {
            change.wrapBlockByKey(child.key, 'figure')
            return
        }

        // A subfigure following a media block. In such case we want to wrap
        // said media block in a subfigure of it's own.
        if (child.type === 'figure' && index > 0) {
            change.wrapBlockByKey(node.nodes.get(index - 1).key, 'figure')
            return
        }

        // Otherwise we just unwrap the child.
        change.unwrapNodeByKey(child.key)
        break

    case 'child_unknown':
        // Subfigure or media node after caption.
        if (child.type === 'figure' || child.type === 'media') {
            change.moveNodeByKey(child.key, node.key, index - 1)
            return
        }

        // Unwrap invalid nodes outside a figure.
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
    case 'parent_type_invalid':
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
                { match: [{ type: 'figure_caption' }], min: 0, max: 1 },
            ],
            normalize: normalizeFigure,
        },
        figure_caption: {
            parent: { type: 'figure' },
            normalize: normalizeCaption,
        },
    },
    // Detailed rules.
    rules: [
        // Figures must contain exactly one media block and optional caption,
        {
            match: {
                object: 'block',
                type: 'figure',
                first: { object: 'block', type: 'media' },
            },
            nodes: [
                { match: [{ type: 'media' }], min: 1, max: 1 },
                { match: [{ type: 'figure_caption' }], min: 0, max: 1 },
            ],
            normalize: normalizeFigure,
        },
        // ... or at least two figure blocks and optional caption,
        {
            match: {
                object: 'block',
                type: 'figure',
                first: { object: 'block', type: 'figure' },
            },
            nodes: [
                { match: [{ type: 'figure' }], min: 2 },
                { match: [{ type: 'figure_caption' }], min: 0, max: 1 },
            ],
            normalize: normalizeFigure,
        },
        // ... but may not be nested more than once.
        // TODO: this case. We probably need a negative predicate, something like
        // {
        //     match: {
        //         object: 'block',
        //         type: 'figure',
        //         first: { object: 'block', type: 'figure' },
        //     },
        //     parent: {
        //         invert: true,
        //         object: 'block',
        //         type: 'figure',
        //     },
        // },
    ],
}
