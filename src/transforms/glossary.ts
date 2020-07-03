// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Editor, Element, Location, Path, Range, Transforms } from 'slate'

import { Definition, DefinitionExample, Glossary, Meaning, SeeAlso } from '../interfaces'

/**
 * Add a new definition to the glossary
 *
 * If there is no glossary in the document a new one will be created.
 *
 * If select is set to true the selection will be collapsed into the new
 * definition.
 */
export function addGlossaryDefinition(
    editor: Editor,
    options: {
        at?: Location,
        mode?: 'before' | 'after',
        select?: boolean,
    } = {},
): void {
    Editor.withoutNormalizing(editor, () => {
        const { at = editor.selection, mode = 'after', select } = options

        if (at == null) return

        const node = {
            type: 'definition',
            children: [{
                type: 'definition_term',
                children: [{ text: '' }],
            }],
        }

        // Fast path: there is no glossary in the document.
        if (!Glossary.isGlossary(editor.children[editor.children.length - 1])) {
            Transforms.insertNodes(editor, {
                type: 'glossary',
                children: [node],
            }, { at: [editor.children.length], select })
            return
        }

        const [start, end] = Range.edges(Editor.range(editor, at))
        const path = mode === 'before' ? start.path : end.path

        let [glossary, glossaryPath] = Editor.above(editor, {
            at: path,
            match: Glossary.isGlossary,
        })!

        let index

        if (glossary == null) {
            glossaryPath = [editor.children.length - 1]
            glossary = Editor.node(editor, glossaryPath)[0] as Glossary
            index = mode === 'before' ? 0 : glossary.children.length
        } else {
            index = Path.relative(path, glossaryPath)[0]
                + (mode === 'before' ? 0 : 1)
        }

        Transforms.insertNodes(editor, node, {
            at: [...glossaryPath, index],
            select,
        })
    })
}

/**
 * Insert new item into a definition
 *
 * Does nothing if no definition is selected.
 *
 * If select is set to true the selection will be collapsed into the new item.
 */
function insertItem(
    editor: Editor,
    element: Omit<Meaning | DefinitionExample, 'children'>,
    options: {
        at?: Location,
        select?: boolean,
    } = {},
): void {
    Editor.withoutNormalizing(editor, () => {
        const { at = editor.selection, select } = options

        if (at == null) return

        const atPath = Editor.path(editor, at)

        const [[definition, definitionPath]] = Editor.levels(editor, {
            at: atPath,
            match: Definition.isDefinition,
        })

        if (definition == null) return

        const index = Path.relative(atPath, definitionPath)[0]
        const item = definition.children[index]

        const newPath = SeeAlso.isSeeAlso(item)
            ? [...definitionPath, index]
            : [...definitionPath, index + 1]

        Transforms.insertNodes(editor, {
            ...element,
            children: [{
                type: 'paragraph',
                children: [{ text: "" }],
            }],
        }, { at: newPath, select })
    })
}

/**
 * Insert a new meaning into a definition
 *
 * Does nothing if no definition is selected.
 */
export function insertMeaning(
    editor: Editor,
    options: {
        at?: Location,
        select?: boolean,
    } = {},
): void {
    insertItem(editor, { type: 'definition_meaning' }, options)
}

/**
 * Insert a new example into a definition
 *
 * Does nothing if no definition is selected.
 *
 * If select is set to true the selection will be collapsed into the new
 * example.
 */
export function insertDefinitionExample(
    editor: Editor,
    options: {
        at?: Location,
        select?: boolean,
    } = {},
): void {
    insertItem(editor, { type: 'definition_example' }, options)
}

/**
 * Insert a new see-also section into a definition.
 *
 * Does nothing if no definition is selected. If the definition already contains
 * a see-also section, a new see-also term is added to it instead.
 *
 * If select is set to true the selection will be collapsed into the new
 * see-also term.
 */
export function insertSeeAlso(
    editor: Editor,
    options: {
        at?: Location,
        select?: boolean,
    } = {},
): void {
    Editor.withoutNormalizing(editor, () => {
        const { at = editor.selection, select } = options

        if (at == null) return

        const atPath = Editor.path(editor, at)

        const [[definition, definitionPath]] = Editor.levels(editor, {
            at: atPath,
            match: Definition.isDefinition,
        })

        if (definition == null) return

        const relPath = Path.relative(atPath, definitionPath)
        const index = relPath[0]
        const item = definition.children[index]

        let newPath
        let node: Element = {
            type: 'definition_term',
            children: [{ text: '' }],
        }

        if (SeeAlso.isSeeAlso(item)) {
            newPath = [...definitionPath, index, relPath[1] + 1]
        } else {
            newPath = [...definitionPath, definition.children.length]
            node = {
                type: 'definition_seealso',
                children: [node],
            }
        }

        Transforms.insertNodes(editor, node, { at: newPath, select })
    })
}
