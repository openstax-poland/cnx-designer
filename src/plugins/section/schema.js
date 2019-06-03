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

    /* istanbul ignore next */
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
            // Unwrap content from section.
            const path = change.value.document.getPath(node.key)
            change.unwrapChildrenByPath(path)
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

    /* istanbul ignore next */
    default:
        console.warn('Unhandled section violation:', code)
        break
    }
}

export default function schema(options) {
    const content = options.content.map(type => ({ type }))

    return {
        document: {
            nodes: [
                {
                    match: content,
                    min: 1,
                },
            ],
            normalize: normalizeDocument,
        },
        blocks: {
            section: {
                nodes: [
                    { match: { type: 'title' }, min: 1, max: 1 },
                    {
                        match: content,
                        min: 1,
                    },
                ],
                next: { type: 'section' },
                normalize: normalizeSection,
            }
        },
    }
}
