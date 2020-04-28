// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Editor, Node, NodeEntry, Transforms } from 'slate'

import { AltText, Caption, Figure, Media, Section } from '../interfaces'
import { enumerate } from '../util'
import { normalizeOrderedChildren } from './util'

/**
 * Normalize a figure
 *
 * Return true if entry was normalized and false otherwise.
 */
export default function normalizeFigure(editor: Editor, entry: NodeEntry): boolean {
    const [node, path] = entry

    if (Figure.isFigure(node)) {
        // Figure can only be a child of sections, the document, and other
        // figures.
        const [parent, parentPath] = Editor.parent(editor, path)
        if (!Section.isSection(parent) && !Figure.isFigure(parent)
        && parentPath.length > 0) {
            Transforms.liftNodes(editor, { at: path })
            return true
        }

        // Nested figures can't contain subfigures.
        if (Figure.isFigure(parent) && node.children.some(Figure.isFigure)) {
            Transforms.unwrapNodes(editor, {
                at: path,
                match: n => n === node,
            })
            return true
        }

        // Ensure children are ordered items then captions. At this point there
        // may still be multiple captions interspersed with items.
        if (normalizeOrderedChildren(
            editor,
            [node, path],
            [isFigureItem, Caption.isCaption],
            normalizeInvalidChild,
        )) {
            return true
        }

        // At this point there can only be one caption, and it can only be the
        // last child.
        const hasCaption = Caption.isCaption(node.children[node.children.length - 1])
        const length = node.children.length - (hasCaption ? 1 : 0)

        // Figures must not be empty.
        if (length === 0) {
            Transforms.removeNodes(editor, { at: path })
            return true
        }

        // There must be more than one subfigure.
        if (length === 1 && Figure.isFigure(node.children[0])) {
            Transforms.unwrapNodes(editor, { at: [...path, 0] })
            return true
        }

        // If there is more than one item, all must be subfigures.
        if (length > 1) {
            for (const [inx, child] of enumerate(node.children)) {
                if (Figure.isFigure(child) || Caption.isCaption(child)) {
                    continue
                }

                Transforms.wrapNodes(editor, {
                    type: 'figure',
                    children: [],
                }, { at: [...path, inx] })

                return true
            }
        }
    }

    if (Media.isMedia(node)) {
        // Media elements must contain at least one media item.
        if (node.children.length === 0
        || (node.children.length === 1 && AltText.isAltText(node.children[0]))) {
            Transforms.removeNodes(editor, { at: path })
            return true
        }
    }

    return false
}

function isFigureItem(node: Node): node is Figure | Media {
    return Figure.isFigure(node) || Media.isMedia(node)
}

function normalizeInvalidChild(editor: Editor, entry: NodeEntry): void {
    const [, path] = entry
    Transforms.unwrapNodes(editor, { at: path })
}
