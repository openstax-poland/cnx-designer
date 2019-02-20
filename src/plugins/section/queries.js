// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

/**
 * Find the outer-most selected section.
 *
 * @param {Slate~Editor} editor
 * @param {Slate~Value} value
 *
 * @return {Slate~Block|null}
 */
export function getActiveSection(editor, value) {
    const { document, blocks } = value
    const first = blocks.first()

    // No selection
    if (!first) return null

    const path = document.getPath(first.key)

    let node = document
    for (const index of path) {
        node = node.nodes.get(index)

        if (node.type === 'section') return node
    }

    return null
}

/**
 * Find the inner-most selected section.
 *
 * @param {Slate~Editor} editor
 * @param {Slate~Value} value
 *
 * @return {Slate~Block|null}
 */
export function getActiveSubsection(editor, value) {
    const { document, blocks } = value
    const first = blocks.first()

    // No selection
    if (!first) return null

    const path = document.getPath(first.key)

    let section = null
    let node = document
    for (const index of path) {
        node = node.nodes.get(index)

        if (node.type === 'section') {
            section = node
        }
    }

    return section
}
