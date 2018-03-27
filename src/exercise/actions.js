/** @jsx createMenu */

import { Block, Text } from 'slate'

import createMenu from '../actions'

import * as utils from './utils'


function insertExercise(change) {
    const { value } = change
    const { document, schema } = value
    const rule = schema.blocks.exercise

    let first = value.startBlock
    let last = value.endBlock

    // Find the lowest common ancestor of nodes in selected range.
    let parent = document.getClosest(first.key, p1 => {
        return !!document.getClosest(last.key, p2 => p1 === p2)
    }) || document

    // Simple case: if slate will place exercise correctly let it.
    if (rule.parent.types.includes(parent.type)) {
        return change.withoutNormalization(change => {
            change.wrapBlock('exercise')
            change.wrapBlock('exercise_problem')
        })
    }

    // Adjust beginning of selection so that it's a direct child of parent
    for (;;) {
        const pp = change.value.document.getParent(first.key)
        if (pp.key === parent.key) break

        const index = pp.nodes.indexOf(first)
        if (index === 0) {
            first = pp
        } else {
            change.splitNodeByKey(pp.key, index, { normalize: false })
            first = change.value.document.getParent(first.key)
        }
    }

    // Adjust end of selection so that it's a direct child of parent
    for (;;) {
        const pp = change.value.document.getParent(last.key)
        if (pp.key === parent.key) break

        const index = pp.nodes.indexOf(last)
        if (index + 1 === pp.nodes.size) {
            last = pp
        } else {
            change.splitNodeByKey(pp.key, index + 1, { normalize: false })
            last = change.value.document.getParent(last.key)
        }
    }

    // Unwrap selected range out of its parent until we can wrap it in
    // an exercise.
    parent = change.value.document.getDescendant(parent.key)
    while (!rule.parent.types.includes(parent.type)) {
        if (first !== last) {
            const firstInx = parent.nodes.indexOf(first)
            const lastInx = parent.nodes.indexOf(last) + 1

            if (lastInx + 1 < parent.nodes.size) {
                change.splitNodeByKey(parent.key, lastInx, { normalize: false })
            }
            if (firstInx > 0) {
                change.splitNodeByKey(parent.key, firstInx, { normalize: false })
            }

            first = last = change.value.document.getParent(first.key)
            parent = change.value.document.getParent(first.key)
        } else {
            change.unwrapNodeByKey(first.key, { normalize: false })
            parent = change.value.document.getParent(first.key)
        }
    }

    const index = parent.nodes.indexOf(first)
    const nodes = parent.nodes.slice(index, parent.nodes.indexOf(last) + 1)

    const problem = Block.create({ type: 'exercise_problem'})
    const block = Block.create({ type: 'exercise', nodes: [problem] })
    change.insertNodeByKey(parent.key, index, block, { normalize: false })

    nodes.forEach((node, inx) => {
        change.moveNodeByKey(node.key, problem.key, inx, { normalize: false })
    })

    if (change.getFlag('normalize')) {
        change.normalizeNodeByKey(parent.key)
    }
}


function insertSolution(change) {
    const exercise = utils.getCurrentExercise(change.value)

    const text = Text.create()
    const block = Block.create({
        type: 'paragraph',
        nodes: [text],
    })
    const solution = Block.create({
        type: 'exercise_solution',
        nodes: [block],
    })

    const index = exercise.nodes.size
        + (exercise.nodes.last().type === 'exercise_commentary' ? -1 : 0)

    change.insertNodeByKey(exercise.key, index, solution)
    change.collapseToStartOf(block)
}


function insertCommentary(change) {
    const exercise = utils.getCurrentExercise(change.value)

    const text = Text.create()
    const block = Block.create({
        type: 'paragraph',
        nodes: [text],
    })
    const commentary = Block.create({
        type: 'exercise_commentary',
        nodes: [block],
    })

    change.insertNodeByKey(exercise.key, exercise.nodes.size, commentary)
    change.collapseToStartOf(block)
}


export default <group category="Insert" title="Exercise">
    <action
        title="Exercise"
        action={insertExercise}
        />
    <action
        title="Solution"
        action={insertSolution}
        enabled={value => utils.getCurrentExercise(value) !== null}
        />
    <action
        title="Commentary"
        action={insertCommentary}
        enabled={value => {
            const exercise = utils.getCurrentExercise(value)
            return exercise && exercise.nodes.last().type !== 'exercise_commentary'
        }}
        />
</group>
