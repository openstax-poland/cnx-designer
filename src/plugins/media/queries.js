// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.


/**
 * Find the outer-most selected media.
 *
 * @return {Slate~Block|null}
 */
export function getActiveMedia(editor, value) {
    const { document, blocks } = value
    const first = blocks.first()

    // No selection.
    if (!first) {
        return null
    }

    const path = document.getPath(first.key)

    let node = document
    for (const index of path) {
        node = node.nodes.get(index)

        if (node.type === 'media') {
            return node
        }
    }

    return null
}
