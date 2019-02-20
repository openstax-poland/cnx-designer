// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

function normalizeTitle(change, error) {
    console.warn('Unhandled title violation:', error.code)
}

export default {
    blocks: {
        title: {
            marks: [
                { type: 'strong' },
                { type: 'emphasis' },
                { type: 'underline' },
                { type: 'superscript' },
                { type: 'subscript' },
            ],
            normalize: normalizeTitle,
        },
    },
}
