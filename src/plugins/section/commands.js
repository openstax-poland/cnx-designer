// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Block, Range, Text } from 'slate'

/**
 * Create a new section.
 *
 * @param {Slate~Change} change
 */
export function insertSection(change) {
    change.withoutNormalizing(change => {
        const { value } = change
        const { document, startBlock, endBlock } = value

        // First the lowest common ancestor of nodes in selected range
        const start = lca(document, startBlock, endBlock)
        const parent = document.getParent(start.key)
        const index = parent.nodes.indexOf(start)

        // Do not insert section in elements like exercise, admonition, etc.
        if (parent.object !== 'document' && parent.type !== 'section') return

        // Create title for the new section, and put cursor in it
        const title = Block.create({
            type: 'title',
            nodes: [Text.create()],
        })
        change.insertNodeByKey(parent.key, index, title)
        change.moveToStartOfNode(title)

        // Rather than always creating nested sections we match depth of current
        // one.
        if (parent.type === 'section') {
            change.splitNodeByKey(parent.key, index)
            return
        }

        // Next find range of nodes between start and the next section
        const last = parent.nodes.findLast(
            (node, inx) => node.type !== 'section' && inx >= index)

        // Finally wrap all those nodes in a section
        const range = Range.create()
            .moveStartToStartOfNode(title)
            .moveEndToEndOfNode(last)
        change.wrapBlockAtRange(range, 'section')
    })
}

/**
 * Find the lowest common ancestor of two nodes.
 *
 * Note that this function considers node to be an ancestor of itself, thus
 * {@code lca(root, node, node) === node}.
 *
 * @param {Slate~Node} root node in which to search
 * @param {Slate~Node} a
 * @param {Slate~Node} b
 *
 * @return {Slate~Node}
 */
function lca(root, a, b) {
    if (a === b) return a

    return root.getClosest(a.key, p1 => {
        return !!root.getClosest(b.key, p2 => p1 === p2)
    }) || root
}

/**
 * Increase depth of currently selected section.
 *
 * @param {Slate~Editor} change
 */
export function increaseSectionDepth(change) {
    const { value } = change
    const section = change.getActiveSubsection(value)

    // No section is selected
    if (section == null) return

    const parent = value.document.getParent(section.key)
    const index = parent.nodes.indexOf(section)
    const previous = parent.nodes.get(index - 1)

    // This is the first (sub)section, it's depth cannot be increased
    if (previous == null || previous.type !== 'section') return

    // Move |section| at the end of |previous|
    change.moveNodeByKey(section.key, previous.key, previous.nodes.size)

    // Move all subsections of |section| after it into |previous|. This way we
    // only change depth of |section| and not of its subsections.
    const subsections = section.nodes.toSeq()
        .reverse()
        .takeWhile(n => n.type === 'section')
    for (const node of subsections) {
        change.moveNodeByKey(node.key, previous.key, previous.nodes.size + 1)
    }
}

/**
 * Decrease depth of currently selected section.
 *
 * @param {Slate~Editor} change
 */
export function decreaseSectionDepth(change) {
    const { value } = change
    const section = change.getActiveSubsection(value)

    // No section is selected
    if (section == null) return

    const parent = value.document.getParent(section.key)

    // There are no more sections to unwrap this one from.
    if (parent.type !== 'section') return

    const index = parent.nodes.indexOf(section)
    const pparent = value.document.getParent(parent.key)
    const pindex = pparent.nodes.indexOf(parent)

    // Move |section| after |parent|
    change.moveNodeByKey(section.key, pparent.key, pindex + 1)

    // Move all sections after |section| at the end of it. This way we only
    // change depth of |section| and not of sections after it.
    for (const node of parent.nodes.slice(index).reverse()) {
        change.moveNodeByKey(node.key, section.key, section.nodes.size)
    }
}
