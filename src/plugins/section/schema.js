// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { List } from 'immutable'

function normalizeDocument(change, error) {
    const { code, node, child } = error

    switch (code) {
    // Document is empty.
    case 'child_min_invalid':
        change.insertNodeByKey(node.key, 0, {
            object: 'block',
            type: 'paragraph',
        })
        break

    case 'child_type_invalid':
        if (child.type === 'title') {
            change.setNodeByKey(child.key, { type: 'paragraph' })
            return
        }
        console.warn('Unhandled document violation:', error.code)
        break

    default:
        console.warn('Unhandled document violation:', error.code)
    }
}

function normalizeSection(change, error) {
    const { code, node, child, next, index, key } = error

    switch (code) {
    case 'child_min_invalid':
        if (index === 0) {
            // Section has no title.
            change.unwrapBlockByKey(node.key)
            return
        }
        // Section has a title but doesn't have any content.
        change.insertNodeByKey(node.key, 1, {
            object: 'block',
            type: 'paragraph',
        })
        break

    case 'child_max_invalid':
        // Two titles in a section. This usually happens when user presses enter
        // in a title.
        if (child.type === 'title') {
            change.setNodeByKey(child.key, { type: 'paragraph' })
            return
        }
        console.warn('Unhandled violation in section:', code)
        break

    // There is a block after section that is not a section itself.
    case 'next_sibling_type_invalid':
        // XXX: while we would expect |node| to refer to section it is in fact
        // its parent.
        let parent = node.nodes.get(index)
        change.moveNodeByKey(next.key, parent.key, parent.nodes.size)
        break

    case 'node_data_invalid':
        if (key === 'class') {
            const newClasses = List(node.data.get('class').join(' ').trim().split(/\s+/))
            const newData = node.data.set('class', newClasses)
            change.setNodeByKey(node.key, { data: newData })
            break
        }

        console.warn('Unhandled section violation:', code)
        break

    default:
        console.warn('Unhandled section violation:', code)
        break
    }
}

/**
 * Nodes which may appear in a section and in the document.
 */
const DOCUMENT_NODES = [
    { type: 'admonition' },
    { type: 'exercise' },
    { type: 'figure' },
    { type: 'ol_list' },
    { type: 'paragraph' },
    { type: 'section' },
    { type: 'table' },
    { type: 'ul_list' },
]

export default {
    document: {
        nodes: [
            {
                match: DOCUMENT_NODES,
                min: 1,
            },
        ],
        normalize: normalizeDocument,
    },
    blocks: {
        section: {
            data: {
                class: c => c == null || (List.isList(c) && c.every(x => x.match(/\s/) == null)),
            },
            nodes: [
                { match: { type: 'title' }, min: 1, max: 1 },
                {
                    match: DOCUMENT_NODES,
                    min: 1,
                },
            ],
            next: { type: 'section' },
            normalize: normalizeSection,
        }
    },
}
