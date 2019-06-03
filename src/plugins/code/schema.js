// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

function normalizeCodeBlock(change, error) {
    const { code, node, child } = error

    switch (code) {
    case 'child_node_invalid':
        change.unwrapBlockByKey(child.key)
        break

    /* istanbul ignore next */
    default:
        console.warn('Unhandled code (block) violation:', code)
        break
    }
}

function normalizeCodeInline(change, error) {
    /* istanbul ignore next */
    console.warn('Unhandled code (inline) violation:', error.code)
}

export default {
    blocks: {
        code: {
            nodes: [ { match: { object: 'text' } } ],
            normalize: normalizeCodeBlock,
        }
    },
    inlines: {
        code: {
            marks: [],
            nodes: [ { match: { object: 'text' } } ],
            normalize: normalizeCodeInline,
        }
    }
}
