// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

function normalizeQuotation(change, error) {
    const { code, node, child, index } = error

    switch (code) {
    case 'child_max_invalid':
        if (child.type === 'title') {
            change.mergeNodeByKey(child.key)
            return
        }
        console.warn('Unhandled quotation violation:', code)
        break

    case 'child_min_invalid':
        if (index === 1 && node.nodes.get(0).type === 'quotation') {
            change.unwrapBlockByKey(node.nodes.get(0).key)
            return
        }
        console.warn('Unhandled quotation violation:', code)
        break

    case 'child_type_invalid':
        change.unwrapNodeByKey(child.key)
        break

    default:
        console.warn('Unhandled quotation violation:', code)
        break
    }
}

const QUOTE_CONTENT = [
    { type: 'ol_list' },
    { type: 'paragraph' },
    { type: 'quotation' },
    { type: 'ul_list' },
]

export default {
    blocks: {
        quotation: {
            nodes: [
                { match: { type: 'title' }, min: 0, max: 1 },
                { match: QUOTE_CONTENT, min: 1 },
                // TODO: citation (source)
            ],
            normalize: normalizeQuotation,
        },
    },
    rules: [
        {
            match: {
                type: 'quotation',
                first: { type: 'quotation' },
            },
            nodes: [
                { match: QUOTE_CONTENT, min: 2 },
            ],
            normalize: normalizeQuotation,
        },
    ],
}
