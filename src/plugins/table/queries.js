// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

export function getCounterDefinitions(editor, definitions) {
    definitions.push({
        table: {
            table: 'enter',
        },
    })
}

/**
 * Find the outer-most selected @param nodeType
 *
 * @param {string} nodeType Node type to find
 * @return {Slate~Block|null}
 */
export function getActiveTableNode(editor, nodeType) {
    const { document, blocks } = editor.value
    const first = blocks.first()

    // No selection.
    if (!first) {
        return null
    }

    const path = document.getPath(first.key)

    let node = document
    for (const index of path) {
        node = node.nodes.get(index)

        if (node.type === nodeType) {
            return node
        }
    }

    // Allow finding those nodes when cursor is just in table
    if ([
        'table_caption',
        'table_tbody',
        'table_thead',
        'table_tfoot',
        'table_summary',
    ].includes(nodeType)) {
        let node = document
        for (const index of path) {
            node = node.nodes.get(index)

            if (node.type === 'table') {
                return node.findDescendant(n => n.type === nodeType)
            }
        }
    }

    return null
}
