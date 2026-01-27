// Copyright 2025 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Ancestor, Editor, Element, Location, Node, NodeEntry, Text } from 'slate'

export type NodeMatch<T extends Node> =
  | ((node: Node) => node is T)
  | ((node: Node) => boolean)

/**
 * Find the first block above a location
 *
 * When mode is {@code lowest}, will return a match only if it doesn't contain
 * blocks.
 *
 * Unlike {@code Editor.above} this function doesn't ignore any nodes.
 */
export function blockAbove<T extends Ancestor>(
    editor: Editor,
    options: {
        at?: Location,
        match?: NodeMatch<T>,
        mode?: 'any' | 'lowest',
    } = {},
): NodeEntry<T> | undefined {
    const {
        at = editor.selection,
        match,
        mode = 'lowest',
    } = options

    if (at == null) return

    const path = Editor.path(editor, at)

    for (const [n, p] of Editor.levels(editor, {
        at: path,
        match,
        reverse: true,
    })) {
        if (!Element.isElement(n) || !Editor.isBlock(editor, n)) {
            continue
        }

        if (mode === 'lowest' && !Editor.hasInlines(editor, n)) {
            return
        }

        if (!Text.isText(n)) {
            return [n, p]
        }
    }
}
