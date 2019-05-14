// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Text } from 'slate'

function normalizeQuotation(change, error) {
    const { code, node, child, index } = error
    let first

    switch (code) {
    case 'child_max_invalid':
        if (child.type === 'title') {
            change.setNodeByKey(child.key, 'paragraph')
            return
        }
        console.warn('Unhandled quotation violation:', code)
        break

    case 'child_min_invalid':
        first = node.nodes.get(0)

        if (index === 1 && first.type === 'quotation') {
            change.unwrapBlockByKey(first.key)
            return
        }

        if (index === 1 && first.type === 'title') {
            change.insertNodeByKey(node.key, 1, {
                object: 'block',
                type: 'paragraph',
                nodes: [Text.create('')],
            })
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
