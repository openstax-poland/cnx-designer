// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

function normalizeXRef(change, error) {
    console.warn('Unhandled xref violation:', error.code)
}

function normalizeLink(change, error) {
    console.warn('Unhandled link violation:', error.code)
}

export default {
    inlines: {
        xref: {
            isVoid: true,
            // TODO: better data validation
            data: {
                document: value => value == null || typeof value === 'string',
                target: Boolean,
            },
            normalize: normalizeXRef,
        },
        link: {
            // TODO: better data validation
            data: {
                url: Boolean,
            },
            normalize: normalizeLink,
        },
    },
}
