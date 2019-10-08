// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

function normalizeFootnote(change, error) {
    const { code, child } = error

    switch (code) {
    case 'child_object_invalid':
        change.removeNodeByKey(child.key)
        change.insertText(child.getText())
        break

    /* istanbul ignore next */
    default:
        console.warn('Unhandled footnote violation:', code)
        break
    }
}

export default function schema({ marks }) {
    return {
        inlines: {
            footnote: {
                marks: marks.map(type => ({ type })),
                normalize: normalizeFootnote,
                text: s => s.length,
            },
        },
    }
}
