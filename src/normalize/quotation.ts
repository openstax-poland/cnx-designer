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
        if (node.children.length === 0) {
            Transforms.removeNodes(editor, { at: path })
            return true
        }

        // A quotation must have other elements than just a title.
        if (node.children.length === 1 && Title.isTitle(node.children[0])) {
            Transforms.insertNodes(editor, {
                type: 'paragraph',
                children: [],
            }, { at: [...path, 1] })
            return true
        }

        // A quotation must not consist only of another quotation. This however
        // shouldn't apply while outer quotation is selected, as that would it
        // more difficult to create a quotation which begins with another
        // quotation.
        const [parent, parentPath] = Editor.parent(editor, path)
        if (Quotation.isQuotation(parent) && parent.children.length === 1
        && (editor.selection == null || !Range.includes(editor.selection, parentPath))) {
            Transforms.unwrapNodes(editor, { at: path })
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
