// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

function normalizeTitle(change, error) {
    /* istanbul ignore next */
    console.warn('Unhandled title violation:', error.code)
}

export default function schema({ marks }) {
    return {
        blocks: {
            title: {
                marks: marks.map(type => ({ type })),
                normalize: normalizeTitle,
            },
        },
    }
}
