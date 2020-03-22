// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Editor, Location, Path, Transforms } from 'slate'

import { Section } from '../interfaces'

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
        }) || []

        if (section == null) return

        const [prev, prevPath] = Editor.previous(editor, {
            at: sectionPath,
            match: Section.isSection,
        }) || []

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
