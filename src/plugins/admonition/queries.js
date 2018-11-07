// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

export function getActiveAdmonition(editor, value) {
    const { document } = value

    const block = value.startBlock
    if (!block) return null

    const parent = document.getParent(block.key)
    return parent && parent.type === 'admonition' ? parent : null
}
