// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Editor, Node, Path, Range, Text, Transforms } from 'slate'

import {
    Admonition, AltText, Caption, Code, CodeBlock, Commentary, Definition,
    DefinitionExample, Exercise, Figure, Media, Preformat, Problem, Quotation, Rule, Title,
} from './interfaces'

/**
 * Handle a keydown event
 *
 * If the event is handled this function will call preventDefault on it.
 */
export function onKeyDown(editor: Editor, ev: KeyboardEvent): void {
    switch (ev.key) {
    case 'Backspace': return onBackspace(editor, ev)
    case 'Enter': return onEnter(editor, ev)
    default:
    }
}

function isCodeLike(value: unknown): value is CodeBlock | Preformat {
    return Code.isCodeBlock(value) || Preformat.isPreformat(value)
}

function isTextNel(value: unknown): value is Text {
    return Text.isText(value) && value.text.includes('\n')
}

/** Handle backspace */
function onBackspace(editor: Editor, ev: KeyboardEvent): void {
    void ev

    const { selection } = editor

    // Only consider actual, non-collapsed selection.
    if (selection == null || !Range.isCollapsed(selection)) {
        return
    }

    const [code, codePath] = Editor.above(editor, { match: isCodeLike }) ?? []
    if (code != null) {
        // Backspace not at the end will only remove one character, which is
        // exactly what we want.
        if (selection.anchor.offset > 0) {
            return
        }

        // Otherwise backspace will merge the code/preformat with the previous
        // element, which is OK unless there are line breaks, ...

        const [entry] = Editor.nodes(editor, {
            at: codePath,
            match: isTextNel,
        })
        const [nel, path] = entry || []

        if (nel == null) {
            return
        }

        const offset = nel.text.indexOf('\n')
        const point = { path, offset }

        // ... in which case we first split the code/preformat on the first line
        // break and then the default behaviour is again what we want.
        Transforms.delete(editor, { at: point })
        Transforms.splitNodes(editor, { at: point })
    }
}

/** Handle enter/paragraph break */
function onEnter(editor: Editor, ev: KeyboardEvent): void {
    const { selection } = editor

    if (selection == null) {
        return
    }

    const [, titlePath] = Editor.above(editor, { match: Title.isTitle }) ?? []
    if (titlePath != null) {
        Editor.withoutNormalizing(editor, () => {
            if (Editor.point(editor, titlePath, { edge: 'end' }).offset
             !== editor.selection?.focus.offset) {
                Transforms.splitNodes(editor)
                Transforms.setNodes(editor, { type: 'paragraph' }, { at: Path.next(titlePath) })
            } else {
                Transforms.insertNodes(editor, {
                    type: 'paragraph',
                    children: [
                        { text: '' },
                    ],
                })
            }
        })
        return ev.preventDefault()
    }

    const [code, codePath] = Editor.above(editor, { match: isCodeLike }) ?? []
    if (code != null) {
        Editor.withoutNormalizing(editor, () => {
            if (!Range.isCollapsed(selection)) {
                Editor.deleteFragment(editor)
            }

            if (!ev.shiftKey) {
                Editor.insertText(editor, '\n')
                return
            }

            // First split for the future paragraph.
            const paraPath = Path.next(codePath!)
            Transforms.splitNodes(editor)

            // Check if there are any new lines after the split, ...
            const [nel] = Editor.nodes(editor, {
                at: paraPath,
                match: isTextNel,
            })

            // ... and if so perform another split at the first one.
            if (nel != null) {
                const [node, path] = nel
                const offset = node.text.indexOf('\n')
                const point = { path, offset }

                Transforms.delete(editor, { at: point })
                Transforms.splitNodes(editor, { at: point })
            }

            // Finally turn the middle code/preformat into a paragraph.
            Transforms.setNodes(editor, { type: 'paragraph' }, { at: paraPath })
            Transforms.unsetNodes(editor, 'placement', { at: paraPath })
        })

        return ev.preventDefault()
    }

    const [caption, captionPath] = Editor.above(editor, { match: Caption.isCaption }) ?? []
    if (caption != null) {
        Editor.withoutNormalizing(editor, () => {
            if (!Range.isCollapsed(selection)) {
                Editor.deleteFragment(editor)
            }

            Transforms.splitNodes(editor, { always: true })
            Transforms.liftNodes(editor, { at: Path.next(captionPath!) })
        })

        return ev.preventDefault()
    }

    const [altText, altTextPath] = Editor.above(editor, { match: AltText.isAltText }) ?? []
    if (altText != null && altTextPath != null && Range.isCollapsed(selection)) {
        const after = Editor.after(editor, altTextPath)

        if (!after) return

        const newSelection = {
            anchor: {
                path: after.path,
                offset: 0,
            },
            focus: {
                path: after.path,
                offset: 0,
            },
        }

        Transforms.setSelection(editor, newSelection)

        if (!Editor.above(editor, { match: Caption.isCaption })) {
            Transforms.insertNodes(editor, {
                type: 'paragraph',
                children: [
                    { text: '' },
                ],
            })
        }

        return ev.preventDefault()
    }

    // Shift disables special handling
    if (ev.shiftKey) {
        return
    }

    // Selection is collapsed.
    if (Range.isCollapsed(selection)) {
        // Since selection is collapsed it can only be within a single node.
        const path = selection.anchor.path

        // Only handle key if selection is in an empty block, or at a beginning
        // of a block.
        if (selection.anchor.offset > 0) {
            return
        }

        const [container, containerPath] = Editor.above(editor, {
            match: n => Admonition.isAdmonition(n)
                || Caption.isCaption(n)
                || Definition.isDefinition(n)
                || Exercise.isExercise(n)
                || Preformat.isPreformat(n)
                || Quotation.isQuotation(n)
                || Rule.isRule(n),
        }) ?? []

        if (Admonition.isAdmonition(container) || Quotation.isQuotation(container)) {
            Transforms.unwrapNodes(editor, {
                at: path,
                match: n => n === container,
                split: true,
            })
            return ev.preventDefault()
        }

        if (Exercise.isExercise(container)) {
            const [itemIndex, blockIndex] = Path.relative(path, containerPath!)
            const item = container.children[itemIndex]
            const itemPath = [...containerPath!, itemIndex]

            // First element of the item; splitting here would create an empty
            // item, ...
            if (blockIndex === 0) {
                // ... but since this is the last item we can just unwrap it.
                if (itemIndex + 1 === container.children.length) {
                    Transforms.liftNodes(editor, { at: itemPath })
                }

                // Otherwise we prevent any action.
                return ev.preventDefault()
            }

            // Since commentaries are always last, the only reasonable thing to
            // do is unwrap content following cursor from the exercise.
            if (Commentary.isCommentary(item)) {
                Transforms.moveNodes(editor, {
                    at: Editor.range(editor, path, itemPath),
                    to: Path.next(containerPath!),
                })
                return ev.preventDefault()
            }

            // Otherwise split current block.
            Editor.withoutNormalizing(editor, () => {
                Transforms.splitNodes(editor, { at: [...itemPath, blockIndex] })

                // When splitting a problem this way we want to create
                // a solution instead.
                if (Problem.isProblem(item)) {
                    Transforms.setNodes(
                        editor,
                        { type: 'exercise_solution' },
                        { at: Path.next(itemPath) },
                    )
                }
            })

            return ev.preventDefault()
        }

        if (Definition.isDefinition(container)) {
            const [itemIndex, blockIndex] = Path.relative(path, containerPath!)
            const item = container.children[itemIndex]
            const itemPath = [...containerPath!, itemIndex]

            Editor.withoutNormalizing(editor, () => {
                Transforms.splitNodes(editor, { at: [...itemPath, blockIndex] })

                // When splitting an example we want to create a meaning instead
                if (DefinitionExample.isDefinitionExample(item)) {
                    Transforms.setNodes(
                        editor,
                        { type: 'definition_meaning' },
                        { at: Path.next(itemPath) },
                    )
                }
            })

            return ev.preventDefault()
        }

        if (Rule.isRule(container)) {
            const [itemIndex, blockIndex] = Path.relative(path, containerPath!)
            const itemPath = [...containerPath!, itemIndex]

            // First element of the item; splitting here would create an empty
            // item, ...
            if (blockIndex === 0) {
                // ... but since this is the last item we can just unwrap it.
                if (itemIndex + 1 === container.children.length) {
                    Transforms.liftNodes(editor, { at: itemPath })
                }

                // Otherwise we prevent any action.
                return ev.preventDefault()
            }

            // Otherwise split current block.
            Transforms.splitNodes(editor, { at: [...itemPath, blockIndex] })
            return ev.preventDefault()
        }
    }
}
