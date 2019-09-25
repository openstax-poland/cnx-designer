// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

function normalizePreformatBlock(change, error) {
    const { child, code } = error

    switch (code) {
    case 'child_type_invalid':
        change.unwrapNodeByKey(child.key)
        break

    default:
        /* istanbul ignore next */
        console.warn('Unhandled preformat violation:', code)
    }
}

export default function schema({ marks = [], inlines = [] }) {
    const content = [
        ...inlines.map(type => ({ type })),
        { object: 'text' },
    ]
    const marksTypes = marks.map(type => ({ type }))

    return {
        blocks: {
            preformat: {
                nodes: [{ match: content }],
                marks: marksTypes,
                normalize: normalizePreformatBlock,
            },
        },
    }
}
