// Copyright 2021 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Editor, Node, NodeEntry, Range, Transforms } from 'slate'
import { List } from 'slate-lists'

import { Paragraph, Quotation, Title } from '../interfaces'
import { normalizeOrderedChildren } from './util'

/**
 * Normalize an quotation
 *
 * Return true if entry was normalized and false otherwise.
 */
export default function normalizeQuotation(editor: Editor, entry: NodeEntry): boolean {
    const [node, path] = entry

    if (Quotation.isQuotation(node)) {
        // A quotation must not be empty.
        if (Editor.isEmpty(editor, node)) {
            Transforms.removeNodes(editor, { at: path })
            return true
        }

        // When a quotation is created out of a list, all the list items must be kept
        // inside the quotation.
        if (List.isList(Editor.parent(editor, path)[0])) {
            const [parent] = Editor.parent(editor, path)
            const parentWithoutIdAndChildren = { ...parent, id: undefined, children: [] }
            Editor.withoutNormalizing(editor, () => {
                Transforms.wrapNodes(editor, parentWithoutIdAndChildren)
                Transforms.liftNodes(editor, { at: path, match: n => Quotation.isQuotation(n) })
            })
            return true
        }

        // Unwrap nested quotation if it is not selected
        // and it's the only child of another quotation.
        if (node.children.length === 1
        && Quotation.isQuotation(node.children[0])
        && (editor.selection == null || !Range.includes(editor.selection, path))) {
            Transforms.unwrapNodes(editor, { at: [...path, 0] })
            return true
        }

        // Quotations may contain only Titles, Paragraphs,
        // Lists and other Quotations
        if (normalizeOrderedChildren(
            editor,
            [node, path],
            [Title.isTitle, isQuotationChild],
            (editor, entry) => Transforms.liftNodes(editor, { at: entry[1] }),
        )) {
            return true
        }
    }

    return false
}

function isQuotationChild(node: Node): node is Paragraph | List | Quotation {
    return Paragraph.isParagraph(node) || List.isList(node) || Quotation.isQuotation(node)
}
