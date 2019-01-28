// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Block, Text } from 'slate'

import { EXERCISE_PARENT } from './schema'

/**
 * Create a new exercise and wrap currently selected block in it.
 *
 * @param {Slate~Change} change
 */
export function insertExercise(change) {
    change.withoutNormalizing(change => {
        const { value } = change
        const { document } = value

        let first = value.startBlock
        let last = value.endBlock

        // Find the lowest common ancestor of nodes in selected range.
        let parent = document.getClosest(first.key, p1 => {
            return !!document.getClosest(last.key, p2 => p1 === p2)
        }) || document

        // When using `change.wrapBlock` slate will place blocks according to its
        // own rules, which don't take into account legal parent-child relations,
        // which may cause exercise to be created as a child of e.g. a list,
        // and then promptly removed by normalizations. To avoid this we only use
        // `change.wrapBlock` when we're sure output will be OK.
        if (EXERCISE_PARENT.includes(parent.type)
        || parent.object === 'document') {
            change.wrapBlock('exercise')
            change.wrapBlock('exercise_problem')
            return
        }

        // Adjust selection such that it begins on a direct descendant of |parent|.
        for (;;) {
            const pp = change.value.document.getParent(first.key)
            if (pp.key === parent.key) break

            // If |first| is the first child of its parent (|pp|) then we can just
            // move selection onto |pp|, otherwise we need to split |pp|, as we'll
            // only be moving some of its contents into the new exercise.
            const index = pp.nodes.indexOf(first)
            if (index === 0) {
                first = pp
            } else {
                change.splitNodeByKey(pp.key, index)
                first = change.value.document.getParent(first.key)
            }
        }

        // Adjust selection such that it ends on a direct descendant of |parent|.
        for (;;) {
            const pp = change.value.document.getParent(last.key)
            if (pp.key === parent.key) break

            // See rationale in the previous loop.
            const index = pp.nodes.indexOf(last)
            if (index + 1 === pp.nodes.size) {
                last = pp
            } else {
                change.splitNodeByKey(pp.key, index + 1)
                last = change.value.document.getParent(last.key)
            }
        }

        // Previous two loops might have changed |parent|.
        parent = change.value.document.getDescendant(parent.key)

        // At this point the selection begins and ends on direct children
        // of |parent|, which means we can start unwrapping nodes out if it.

        while (!EXERCISE_PARENT.includes(parent.type)) {
            if (first === last) {
                // Simple case, Slate can handle it on its own.
                change.unwrapNodeByKey(first.key)
                parent = change.value.document.getParent(first.key)
            } else {
                const firstInx = parent.nodes.indexOf(first)
                const lastInx = parent.nodes.indexOf(last) + 1

                if (lastInx + 1 < parent.nodes.size) {
                    change.splitNodeByKey(parent.key, lastInx)
                }
                if (firstInx > 0) {
                    change.splitNodeByKey(parent.key, firstInx)
                }

                first = last = change.value.document.getParent(first.key)
                parent = change.value.document.getParent(first.key)
            }
        }

        // At this point the selected range is directly under a legal parent
        // of exercise.

        const start = parent.nodes.indexOf(first)
        const end = parent.nodes.indexOf(last) + 1
        const nodes = parent.nodes.slice(start, end)

        // Note that nodes in |nodes| are still children of |parent|, so we can't
        // pass them as to `Block.create`, we'll have to move them.
        const problem = Block.create({ type: 'exercise_problem' })
        const exercise = Block.create({ type: 'exercise', nodes: [problem] })
        change.insertNodeByKey(parent.key, start, exercise)

        // Now we can move |nodes| into |problem|.
        nodes.forEach((node, inx) => {
            change.moveNodeByKey(node.key, problem.key, inx)
        })
    })

    change.focus()
}

/**
 * Create a new solution, insert it into current exercise, and collapse
 * selection into it.
 *
 * Fails if no exercise is selected.
 *
 * @param {Slate~Change} change
 */
export function insertSolution(change) {
    const exercise = change.getActiveExercise(change.value)

    if (exercise === null) {
        return
    }

    const text = Text.create()
    const para = Block.create({
        type: 'paragraph',
        nodes: [text],
    })
    const solution = Block.create({
        type: 'exercise_solution',
        nodes: [para],
    })

    const index = exercise.nodes.size
        + (exercise.nodes.last().type === 'exercise_commentary' ? -1 : 0)

    change.insertNodeByKey(exercise.key, index, solution)
    change.moveToStartOfNode(para)
}

/**
 * Create a new commentary, insert it into current exercise, and collapse
 * selection into it.
 *
 * Fails if no exercise is selected, or if selected exercise already has
 * a commentary.
 *
 * @param {Slate~Change} change
 */
export function insertCommentary(change) {
    const exercise = change.getActiveExercise(change.value)

    if (exercise === null || exercise.nodes.last().type === 'exercise_commentary') {
        return
    }

    const text = Text.create()
    const para = Block.create({
        type: 'paragraph',
        nodes: [text],
    })
    const commentary = Block.create({
        type: 'exercise_commentary',
        nodes: [para],
    })

    change.insertNodeByKey(exercise.key, exercise.nodes.size, commentary)
    change.moveToStartOfNode(para)
}
