// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Editor, NodeEntry, Range, Text, Transforms } from 'slate'

import { Caption, Figure, Foreign, Quotation, Term, Title } from '../interfaces'

/**
 * Normalize text nodes
 *
 * Return true if entry was normalized and false otherwise.
 */
export default function normalizeText(editor: Editor, entry: NodeEntry): boolean {
    const [node, path] = entry

    if (Caption.isCaption(node)) {
        // Caption is only allowed as the last child of a figure.
        const [parent] = Editor.parent(editor, path)
        if (!Figure.isFigure(parent)) {
            Transforms.setNodes(editor, { type: 'paragraph' }, { at: path })
            return true
        }

        // Figure must not have more than one caption.
        const [next, nextPath] = Editor.next(editor, { at: path }) ?? []
        if (Caption.isCaption(next)) {
            Transforms.mergeNodes(editor, { at: nextPath })
            return true
        }
    }

    if (Title.isTitle(node)) {
        // Title must be the first child of it's parent.
        if (path[path.length - 1] > 0) {
            Transforms.setNodes(editor, { type: 'paragraph' }, { at: path })
            return true
        }
    }

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
    }

    if (Term.isTerm(node)) {
        // Term containing only a foreign.
        if (
            node.children.length === 3
            && Text.isText(node.children[0]) && node.children[0].text === ''
            && Text.isText(node.children[2]) && node.children[2].text === ''
            && Foreign.isForeign(node.children[1])
        ) {
            const foreign = node.children[1]
            Transforms.unwrapNodes(editor, { at: [...path, 1] })
            Transforms.wrapNodes(editor, { ...foreign, children: [] }, { at: path })
            return true
        }
    }

    // Remove empty inlines, but only if they are not selected.
    if (Editor.isInline(editor, node) && !Editor.isVoid(editor, node)
    && Editor.isEmpty(editor, node)) {
    // For now Slate does not support typing inside empty inlines
    // and in case of:
    // <inline><cursor/></inline>
    // Backspace
    // <cursor/><inline></inline>
    // inline will not be removed because it will not be normalized.
    // We want to support this check in the future when these examples
    // will behave properly.
    // && (editor.selection == null || !Range.includes(editor.selection, path))
        Transforms.removeNodes(editor, { at: path })
        return true
    }

    return false
}
