// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

export function getActiveQuotation(editor, value) {
    const { document, blocks } = value
    const first = blocks.first()

    // No selection.
    if (!first) {
        return null
    }

    const path = document.getPath(first.key)

    let quotation = null
    let node = document
    for (const index of path) {
        node = node.getNode([index])

        if (node.type === 'quotation') {
            quotation = node
        }
    }

    return quotation
}
