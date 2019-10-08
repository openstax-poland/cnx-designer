// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

function normalizeTerm(change, error) {
    const { code, child } = error

    switch (code) {
    case 'child_object_invalid':
        change.removeNodeByKey(child.key)
        change.insertText(child.getText())
        break

    /* istanbul ignore next */
    default:
        console.warn('Unhandled term violation:', code)
        break
    }
}

export default function schema({ marks, inlines }) {
    return {
        inlines: {
            term: {
                nodes: [{
                    match: [
                        ...inlines.map(type => ({ type })),
                        { object: 'text' },
                    ],
                }],
                marks: marks.map(type => ({ type })),
                data: {
                    reference: ref => ref == null || typeof ref === 'string'
                },
                text: s => s.length,
                normalize: normalizeTerm,
            },
        },
    }
}
