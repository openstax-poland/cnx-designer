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
            change.setNodeByKey(node.key, { data: node.data.set('index', 'foreign') })
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

        // index is missing, is empty, or is not a string.
        case 'index': {
            const index = change.value.document.getParent(node.key).type === 'foreign'
                ? 'foreign'
                : 'default'
            change.setNodeByKey(node.key, { data: node.data.set('index', index) })
            return
        }

        // name is empty, or is not a string.
        case 'name':
            change.setNodeByKey(node.key, { data: node.data.delete('name') })
            return

        // born or died are not numbers.
        case 'born':
        case'died':
            change.setNodeByKey(node.key, { data: node.data.delete(key) })
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
                    index: ref => typeof ref === 'string' && ref.length > 0,
                    name: ref => ref == null || typeof (ref === 'string' && ref.length > 0),
                    born: ref => ref == null || typeof ref === 'number',
                    died: ref => ref == null || typeof ref === 'number',
                },
                text: s => s.length,
                normalize: normalizeTerm,
            },
        },
    }
}
