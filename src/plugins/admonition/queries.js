// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

export function getCounterDefinitions(editor, definitions) {
    // TODO: different types of admonitions should use different counters, but
    // this is not currently possible.
    definitions.push({
        admonition: 'enter',
    })
}

export function getActiveAdmonition(editor, value) {
    const { document, blocks } = value
    const first = blocks.first()

    // No selection
    if (!first) return null

    const path = document.getPath(first.key)

    let node = document
    for (const index of path) {
        node = node.nodes.get(index)

        if (node.type === 'admonition') {
            return node
        }
    }

    return null
}
