// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

function normalizeFigure(change, error) {
    const { code: violation, key, node, child } = error

    switch (violation) {
    // Unwrap invalid nodes outside a figure.
    case 'child_unknown':
        change.unwrapNodeByKey(child.key)
        break

    // If there is more than 1 figure_caption then change second one to paragraph
    // and unwrap it
    case 'child_max_invalid':
        if (child.type === 'figure_caption') {
            change.withoutNormalizing(() => {
                change.setNodeByKey(child.key, 'paragraph')
                change.unwrapNodeByKey(child.key)
            })
        }
        break

    case 'child_min_invalid':
        const first = node.nodes.first()
        // When one of subfigures is removed we are unwraping content of second one.
        if (first && first.type === 'figure') {
            const path = change.value.document.getPath(first.key)
            change.unwrapChildrenByPath(path)
            break
        }
        console.warn("Unhandled figure violation", violation)
        break

    /* istanbul ignore next */
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

    /* istanbul ignore next */
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
    rules: [
        {
            match: {
                type: 'figure',
                first: { type: 'figure' },
            },
            nodes: [
                { match: [{ type: 'figure' }, { type: 'figure_caption' } ], min: 2 },
            ],
            normalize: normalizeFigure,
        },
    ],
}
