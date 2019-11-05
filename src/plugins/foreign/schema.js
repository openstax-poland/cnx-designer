// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

function normalizeForeign(editor, error) {
    const { code, node } = error

    switch (code) {
    case 'node_text_invalid':
        editor.removeNodeByKey(node.key)
        break

    default:
        console.warn('Unhandled foreign violation', code)
        break
    }
}

export default function schema({ marks }) {
    return {
        inlines: {
            foreign: {
                marks: marks.map(type => ({ type })),
                data: {
                    lang: l => l == null || typeof l === 'string',
                },
                text: s => s.length,
                normalize: normalizeForeign,
            },
        },
    }
}
