// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

function normalizeParagraph(change, error) {
    console.warn('Unhandled paragraph violation:', error.code)
}

export default {
    blocks: {
        paragraph: {
            marks: [
                { type: 'strong' },
                { type: 'emphasis' },
                { type: 'underline' },
                { type: 'superscript' },
                { type: 'subscript' },
                {
                    type: 'term',
                    data: {
                        reference: ref => typeof ref === 'string' && ref.length
                    },
                },
            ],
            normalize: normalizeParagraph,
        },
    },
}
