// Copyright 2021 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { Editor, Range, Transforms } from 'slate';
import { List } from 'slate-lists';
import { Paragraph, Quotation, Title } from '../interfaces';
import { normalizeOrderedChildren } from './util';
/**
 * Normalize an quotation
 *
 * Return true if entry was normalized and false otherwise.
 */
export default function normalizeQuotation(editor, entry) {
    const [node, path] = entry;
    if (Quotation.isQuotation(node)) {
        // A quotation must not be empty.
        if (Editor.isEmpty(editor, node)) {
            Transforms.removeNodes(editor, { at: path });
            return true;
        }
        // Unwrap nested quotation if it is not selected
        // and it's the only child of another quotation.
        if (node.children.length === 1
            && Quotation.isQuotation(node.children[0])
            && (editor.selection == null || !Range.includes(editor.selection, path))) {
            Transforms.unwrapNodes(editor, { at: [...path, 0] });
            return true;
        }
        // Quotations may contain only Titles, Paragraphs,
        // Lists and other Quotations
        if (normalizeOrderedChildren(editor, [node, path], [Title.isTitle, isQuotationChild], (editor, entry) => Transforms.liftNodes(editor, { at: entry[1] }))) {
            return true;
        }
    }
    return false;
}
function isQuotationChild(node) {
    return Paragraph.isParagraph(node) || List.isList(node) || Quotation.isQuotation(node);
}
