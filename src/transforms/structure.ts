// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Editor, Location, Node, Path, Range, Transforms } from 'slate'

import { Paragraph, Section } from '../interfaces'

/** Insert a new section title, wrapping it and following nodes in a section */
export function wrapSectionTitle(
    editor: Editor,
    options: {
        at?: Location,
    } = {},
): void {
    Editor.withoutNormalizing(editor, () => {
        const { at = editor.selection } = options
        if (at == null) return
        const range = Editor.range(editor, at)

        // Find location for the new section
        /* eslint-disable-next-line
            @typescript-eslint/no-extra-non-null-assertion --
            Editor is above every path, so this cannot return null */
        const [parent, parentPath] = Editor.above(editor, {
            at: range,
            match: node => Section.isSection(node) || Editor.isEditor(node),
        })!!

        // Find the node to transform into new section's title
        const [maybeTitle, maybeTitlePath] = Editor.above(editor, {
            at: range,
            match: node => parent.children.includes(node) && Paragraph.isParagraph(node),
        }) ?? []
        if (maybeTitle == null) {
            throw new Error("only paragraphs which are direct descendants of \
                sections may become section titles")
        }

        // Find location for the new section
        let sectionIndex = 0
        for (; sectionIndex < parent.children.length; ++sectionIndex) {
            if (Section.isSection(parent.children[sectionIndex])) break
        }

        // Insert new section
        Transforms.insertNodes(
            editor,
            { type: 'section', children: [] } as Section,
            { at: [...parentPath, sectionIndex] },
        )
        const sectionPath = Editor.pathRef(editor, [...parentPath, sectionIndex])

        // When selection is collapsed we treat the entire paragraph as the new
        // title, otherwise we extract only the selected fragment.
        let titlePath: Path

        if (Range.isCollapsed(range)) {
            titlePath = maybeTitlePath!
        } else {
            const [start, end] = Range.edges(range)
            let container = maybeTitle

            if (!Editor.isEnd(editor, end, maybeTitlePath!)) {
                Transforms.splitNodes(editor, {
                    at: end,
                    match: node => node === container,
                })
                container = Node.ancestor(editor, maybeTitlePath!)
            }

            if (!Editor.isStart(editor, start, maybeTitlePath!)) {
                titlePath = Path.next(maybeTitlePath!)
                Transforms.splitNodes(editor, {
                    at: start,
                    match: node => node === container,
                })
            } else {
                titlePath = maybeTitlePath!
            }

            // Keep selection on the title
            Transforms.select(editor, titlePath)
        }

        Transforms.setNodes(editor, { type: 'title' }, { at: titlePath })

        // Move content into section. We do it from the end, to prevent index
        // inconsistency in suggestions (in normal mode we'd be always moving
        // from titlePath, but in suggestion move leaves behind a marker, and
        // indexes would change).
        for (
            let index = sectionPath.current![sectionPath.current!.length - 1] - 1;
            index >= titlePath[titlePath.length - 1];
            --index
        ) {
            editor.apply({
                type: 'move_node',
                path: [...parentPath, index],
                newPath: [...sectionPath.current!, 0],
            })
        }
    })
}

/** Increase depth of a section */
export function increaseSectionDepth(
    editor: Editor,
    options: {
        at?: Location,
    } = {},
): void {
    Editor.withoutNormalizing(editor, () => {
        const { at = editor.selection } = options

        if (at == null) return

        const [section, sectionPath] = Editor.above(editor, {
            at,
            match: Section.isSection,
        }) ?? []

        if (section == null) return

        const [prev, prevPath] = Editor.previous(editor, {
            at: sectionPath,
            match: Section.isSection,
        }) ?? []

        if (prev == null) return

        const newPath = [...prevPath!, prev.children.length]

        // Move section at the end of prev.
        Transforms.moveNodes(editor, {
            at: sectionPath,
            to: newPath,
        })

        // Move all subsections of section after it into prev. This way we only
        // change depth of section and not of its subsections.
        Transforms.moveNodes(editor, {
            at: newPath,
            match: n => Section.isSection(n) && section.children.includes(n),
            to: Path.next(newPath),
        })
    })
}

/** Decrease depth of a section */
export function decreaseSectionDepth(
    editor: Editor,
    options: {
        at?: Location,
    } = {},
): void {
    Editor.withoutNormalizing(editor, () => {
        const { at = editor.selection } = options

        if (at == null) return

        const [section, sectionPath] = Editor.above(editor, {
            at,
            match: Section.isSection,
        })!

        // If section path is shorter than two then it can't be nested in
        // another section, and thus its depth can't be decreased.
        if (section == null || sectionPath.length < 2) return

        const [parent, parentPath] = Editor.parent(editor, sectionPath)

        // Move all sections after section at the end of it. This way we only
        // change depth of section and not of sections after it.
        Transforms.moveNodes(editor, {
            at: Editor.range(editor, sectionPath, parentPath),
            match: n => n !== section && Section.isSection(n) && parent.children.includes(n),
            to: [...sectionPath, section.children.length],
        })

        // Move section after parent.
        Transforms.moveNodes(editor, {
            at: sectionPath,
            to: Path.next(parentPath),
        })
    })
}
