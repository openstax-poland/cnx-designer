// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

function normalizeTerm(change, error) {
    const { code, child, node, key } = error

    switch (code) {
    case 'child_type_invalid':
    case 'child_object_invalid':
        if (child.type === 'foreign') {
            // Swap <foreign> and <term>.
            change.wrapInlineByKey(
                node.key, { type: 'foreign', data: child.data })
            change.unwrapChildrenByKey(child.key)
            return
        }

        change.unwrapChildrenByKey(child.key)
        break

    case 'node_data_invalid':
        switch (key) {
        // reference is empty or is not a string.
        case 'reference':
            change.setNodeByKey(node.key, { data: node.data.delete('reference') })
            return
        }

        console.warn('Unhandled term violation:', code, key)
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
                    reference: ref => ref == null || (typeof ref === 'string' && ref.length > 0),
                },
                text: s => s.length,
                normalize: normalizeTerm,
            },
        },
    }
}
