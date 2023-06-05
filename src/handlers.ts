// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Editor, Node, Path, Range, Text, Transforms } from 'slate'

import {
    Admonition, AltText, Caption, Code, CodeBlock, Commentary, DefinitionExample, Meaning,
    Preformat, Problem, Proof, Quotation, Rule, RuleExample, Solution, Statement, Title,
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

    const [alt] = Editor.above(editor, { match: AltText.isAltText }) ?? []
    if (alt != null) {
        if (selection.anchor.offset > 0) return

        // Backspace at the beginning of an alt-text. Slate's default handling
        // would try merging it with the preceding node, which in this case is
        // the void MediaData.
        return ev.preventDefault()
    }
}

/** Handle enter/paragraph break */
function onEnter(editor: Editor, ev: KeyboardEvent): void {
    const { selection } = editor

    if (selection == null) {
        return
    }

    // Non-null assertion is valid because there must be at least one block
    // between the text node containing the cursor and the editor itself.
    const [block, blockPath] = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
    })!

    if (Title.isTitle(block)) {
        Editor.withoutNormalizing(editor, () => {
            if (Editor.point(editor, blockPath, { edge: 'end' }).offset
             !== editor.selection?.focus.offset) {
                Transforms.splitNodes(editor)
                Transforms.setNodes(editor, { type: 'paragraph' }, { at: Path.next(blockPath) })
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

    if (isCodeLike(block)) {
        Editor.withoutNormalizing(editor, () => {
            if (!Range.isCollapsed(selection)) {
                Editor.deleteFragment(editor)
            }

            if (!ev.shiftKey) {
                Editor.insertText(editor, '\n')
                return
            }

            // First split for the future paragraph.
            const paraPath = Path.next(blockPath)
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

    if (Caption.isCaption(block)) {
        Editor.withoutNormalizing(editor, () => {
            if (!Range.isCollapsed(selection)) {
                Editor.deleteFragment(editor)
            }

            Transforms.splitNodes(editor, { always: true })
            Transforms.liftNodes(editor, { at: Path.next(blockPath) })
        })

        return ev.preventDefault()
    }

    if (AltText.isAltText(block) && Range.isCollapsed(selection)) {
        const after = Editor.after(editor, blockPath)

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

    if (Range.isCollapsed(selection)) {
        // Since selection is collapsed it can only be within a single node.
        const path = selection.anchor.path

        // Only handle key if selection is in an empty block, or at a beginning
        // of a block.
        if (path[path.length - 1] !== 0 || selection.anchor.offset > 0) {
            return
        }

        const [container, containerPath] = Editor.above(editor, {
            match: n => Editor.isBlock(editor, n),
            at: blockPath,
        }) ?? []

        if (Admonition.isAdmonition(container) || Quotation.isQuotation(container)) {
            Transforms.unwrapNodes(editor, {
                at: path,
                match: n => n === container,
                split: true,
            })
            return ev.preventDefault()
        }

        if (Problem.isProblem(container) || Solution.isSolution(container)
        || Commentary.isCommentary(container)) {
            const exercise = Node.parent(editor, containerPath!)
            const exercisePath = Path.parent(containerPath!)
            const itemIndex = containerPath![containerPath!.length - 1]
            const blockIndex = blockPath[blockPath.length - 1]

            // First element of the item; splitting here would create an empty
            // item, ...
            if (blockIndex === 0) {
                // ... but since this is the last item we can just unwrap it.
                if (itemIndex + 1 === exercise.children.length) {
                    Transforms.liftNodes(editor, { at: containerPath! })
                }

                // Otherwise we prevent any action.
                return ev.preventDefault()
            }

            // Since commentaries are always last, the only reasonable thing to
            // do is unwrap content following cursor from the exercise.
            if (Commentary.isCommentary(container)) {
                Transforms.moveNodes(editor, {
                    at: Editor.range(editor, path, containerPath),
                    to: Path.next(exercisePath),
                })
                return ev.preventDefault()
            }

            // Otherwise split current block.
            Editor.withoutNormalizing(editor, () => {
                Transforms.splitNodes(editor, { at: [...containerPath!, blockIndex] })

                // When splitting a problem this way we want to create
                // a solution instead.
                if (Problem.isProblem(container)) {
                    Transforms.setNodes(
                        editor,
                        { type: 'exercise_solution' },
                        { at: Path.next(containerPath!) },
                    )
                }
            })

            return ev.preventDefault()
        }

        if (Meaning.isMeaning(container) || DefinitionExample.isDefinitionExample(container)) {
            Editor.withoutNormalizing(editor, () => {
                Transforms.splitNodes(editor, { at: blockPath })

                // When splitting an example we want to create a meaning instead
                if (DefinitionExample.isDefinitionExample(container)) {
                    Transforms.setNodes(
                        editor,
                        { type: 'definition_meaning' },
                        { at: Path.next(containerPath!) },
                    )
                }
            })

            return ev.preventDefault()
        }

        if (Statement.isStatement(container)
        || Proof.isProof(container)
        || RuleExample.isRuleExample(container)) {
            const [rule] = Editor.above(editor, { at: containerPath, match: Rule.isRule })!
            const itemIndex = containerPath![containerPath!.length - 1]
            const blockIndex = blockPath[blockPath.length - 1]

            // First element of the item; splitting here would create an empty
            // item, ...
            if (blockIndex === 0) {
                // ... but since this is the last item we can just unwrap it.
                if (itemIndex + 1 === rule.children.length) {
                    Transforms.liftNodes(editor, { at: containerPath! })
                }

                // Otherwise we prevent any action.
                return ev.preventDefault()
            }

            // Otherwise split current block.
            Transforms.splitNodes(editor, { at: [...containerPath!, blockIndex] })
            return ev.preventDefault()
        }
    }
}
