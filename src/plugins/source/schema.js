// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

function normalizeSourceBlock(change, error) {
    console.warn('Unhandled source element (block) violation:', error.code)
}

function normalizeSourceInline(change, error) {
    console.warn('Unhandled source element (inline) violation:', error.code)
}

export default {
    blocks: {
        source_element: {
            nodes: [{
                match: { object: 'text' }
            }],
            normalize: normalizeSourceBlock,
        },
    },
    inlines: {
        source_element: {
            nodes: [{
                match: { object: 'text' }
            }],
            normalize: normalizeSourceInline,
        }
    }
}
