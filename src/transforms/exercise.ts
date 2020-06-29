// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Editor, Location, Path, Range, Text, Transforms } from 'slate'

import { Commentary, Exercise, Section } from '../interfaces'

/**
 * Create a new exercise and wrap currently selected block in it
 *
 * This function is similar to Slate's Transforms.wrapNodes, but it won't split
 * line elements.
 */
export function insertExercise(
    editor: Editor,
    options: {
        at?: Location,
    } = {},
): void {
    Editor.withoutNormalizing(editor, () => {
        const { at = editor.selection } = options

        if (at == null) return

        let [startPoint, endPoint] = Range.edges(Editor.range(editor, at))

        // Find lowest non-inline nodes containing start and end points.
        const [, startPath] = Editor.above(editor, {
            at: startPoint,
            match: n => !Text.isText(n) && !Editor.isInline(editor, n),
        })!
        const [, endPath] = Editor.above(editor, {
            at: endPoint,
            match: n => !Text.isText(n) && !Editor.isInline(editor, n),
        })!

        // If both points are in the same node we can defer to Slate's
        // wrapNodes. Otherwise we need to do this manually, as wrapNodes with
        // split: true doesn't work when match points at the editor.
        if (Path.equals(startPath, endPath)) {
            Transforms.wrapNodes(editor, {
                type: 'exercise',
                children: [],
            }, { at: startPath })
            return
        }

        // Move start and end points to the extremes, so that splits and moves
        // will correctly move whole line elements.
        startPoint = Editor.start(editor, startPath)
        endPoint = Editor.end(editor, endPath)

        const rangeRef = Editor.rangeRef(editor, Editor.range(editor, startPoint, endPoint))

        // Find lowest common parent of start and end points, which is also
        // a structural element.
        const [[parent, parentPath]] = Editor.levels(editor, {
            at: Path.common(startPath, endPath),
            match: n => Section.isSection(n) || Editor.isEditor(n),
        })

        Transforms.splitNodes(editor, { at: endPoint, match: n => n === parent })
        Transforms.splitNodes(editor, { at: startPoint, match: n => n === parent })

        const newIndex = Path.relative(Range.start(rangeRef.current!).path, parentPath)[0]
        const newPath = [...parentPath, newIndex]

        Transforms.insertNodes(editor, {
            type: 'exercise',
            children: [
                {
                    type: 'exercise_problem',
                    children: [],
                },
            ],
        }, { at: newPath })

        Transforms.moveNodes(editor, {
            at: rangeRef.unref()!,
            to: [...newPath, 0, 0],
            mode: 'highest',
        })
    })
}

/**
 * Insert a solution into an exercise.
 *
 * Does nothing if no exercise is selected. The new solution will be inserted
 * after the last selected item but before the commentary.
 *
 * If select is set to true the selection will be collapsed into the new
 * solution.
 */
export function insertSolution(
    editor: Editor,
    options: {
        at?: Location,
        select?: boolean,
    } = {},
): void {
    Editor.withoutNormalizing(editor, () => {
        const { at = editor.selection, select = false } = options

        if (at == null) return

        const [exercise, exercisePath] = Editor.above(editor, {
            at,
            match: Exercise.isExercise,
        })!

        if (exercise == null) return

        const index = Path.relative(Editor.path(editor, at), exercisePath)[0]
        const item = exercise.children[index]

        const newPath = Commentary.isCommentary(item)
            ? [...exercisePath, index]
            : [...exercisePath, index + 1]

        Transforms.insertNodes(editor, {
            type: 'exercise_solution',
            children: [
                {
                    type: 'paragraph',
                    children: [{ text: "" }],
                },
            ],
        }, { at: newPath, select })
    })
}

/**
 * Insert a commentary into an exercise
 *
 * Does nothing if no exercise is selected, or if selected exercise already has
 * a commentary.
 *
 * If select is set to true the selection will be collapsed into the new
 * commentary.
 */
export function insertCommentary(
    editor: Editor,
    options: {
        at?: Location,
        select?: boolean,
    } = {},
): void {
    Editor.withoutNormalizing(editor, () => {
        const { at, select = false } = options

        if (at == null) return

        const [exercise, path] = Editor.above(editor, {
            at,
            match: Exercise.isExercise,
        })!

        if (exercise == null) return

        const last = exercise.children[exercise.children.length - 1]

        if (Commentary.isCommentary(last)) return

        const newPath = [...path, exercise.children.length]

        Transforms.insertNodes(editor, {
            type: 'exercise_commentary',
            children: [
                {
                    type: 'paragraph',
                    children: [{ text: "" }],
                },
            ],
        }, { at: newPath, select })
    })
}
