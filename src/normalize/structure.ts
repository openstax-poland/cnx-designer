// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Editor, NodeEntry, Transforms } from 'slate'

import { Glossary, Section, Title } from '../interfaces'

/**
 * Normalize document structure
 *
 * Return true if entry was normalized and false otherwise.
 */
export default function normalizeStructure(editor: Editor, entry: NodeEntry): boolean {
    const [node, path] = entry

    // The document.
    if (path.length === 0) {
        // Document must not be empty and must not start with a glossary.
        if (editor.children.length === 0 || Glossary.isGlossary(editor.children[0])) {
            Transforms.insertNodes(editor, {
                type: 'paragraph',
                children: [],
            }, { at: [0] })
            return true
        }

        // If the document starts with a title,
        // the title must be wrapped in a section
        if (Title.isTitle(editor.children[0])) {
            Transforms.wrapNodes(editor, {
                type: 'section',
                children: [],
            }, { at: [0] })
            Transforms.moveNodes(editor, { at: [1], to: [0, 1] })
            return true
        }
    }

    if (Section.isSection(node)) {
        // Sections must not be empty.
        if (node.children.length === 0) {
            Transforms.removeNodes(editor, { at: path })
            return true
        }

        // Sections must have a title.
        if (!Title.isTitle(node.children[0])) {
            const [prev, prevPath] = Editor.previous(editor, { at: path }) ?? []
            if (Section.isSection(prev)) {
                // If this is a subsequent section, move content into the
                // previous section.
                Transforms.moveNodes(editor, {
                    at: Editor.range(editor, path),
                    to: [...prevPath!, prev.children.length],
                })
            } else {
                // Otherwise unwrap it into the parent section.
                Transforms.unwrapNodes(editor, { at: path })
            }
            return true
        }

        // Section must have other elements than just a title.
        if (node.children.length === 1) {
            Transforms.insertNodes(editor, {
                type: 'paragraph',
                children: [],
            }, { at: [...path, 1] })
            return true
        }

        // Section may only be followed by other sections and the glossary.
        const [next, nextPath] = Editor.next(editor, { at: path }) ?? []
        if (next != null && !Section.isSection(next) && !Glossary.isGlossary(next)) {
            Transforms.moveNodes(editor, {
                at: nextPath,
                to: [...path, node.children.length],
            })
            return true
        }

        // Sections may be children only of the document and other sections.
        const [parent, parentPath] = Editor.parent(editor, path)
        if (parentPath.length > 0 && !Section.isSection(parent)) {
            Transforms.liftNodes(editor, { at: path })
            return true
        }
    }

    return false
}
