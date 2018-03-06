import { Block, Text } from 'slate'
import {
    CHILD_TYPE_INVALID,
    CHILD_UNKNOWN,
    PARENT_TYPE_INVALID,
} from 'slate-schema-violations'


function normalizeExercise(change, violation, context) {
    const { index, node, child } = context

    switch (violation) {
    // A child of different type was expected.
    case CHILD_TYPE_INVALID:
        // A text child could only have been added to an exercise by Slate in
        // event that all other children were removed. In such case we just want
        // to drop the exercise.
        if (Text.isText(child)) {
            change.removeNodeByKey(node.key)
            return
        }
        // A non-empty exercise without a problem should get an empty problem.
        if (index === 0) {
            const problem = Block.create({
                type: 'exercise_problem',
                nodes: [
                    // An empty leaf will be added by slate in a subsequent
                    // normalization.
                    Block.create({ type: 'paragraph' })
                ],
            })
            change.insertNodeByKey(node.key, 0, problem)
            return
        }
        // Otherwise (invalid child after the problem but before the commentary)
        // we lift the invalid child into a new solution.
        const solution = Block.create({
            type: 'exercise_solution',
            nodes: [child],
        })
        change.replaceNodeByKey(child.key, solution)
        break

    // No child was expected.
    case CHILD_UNKNOWN:
        // An invalid node following the commentary should be folded into the
        // commentary.
        if (node.nodes.get(-2).type === 'exercise_commentary') {
            const commentary = node.nodes.get(-2)
            change.moveNodeByKey(child.key, commentary.key, commentary.nodes.size)
            return
        }
        break
    }
}


function normalizeContent(change, violation, context) {
    const { node } = context
    console.log('normalize content', violation, context)

    switch (violation) {
    // Problems, solutions, and commentaries make no sense outside an exercise.
    // Should it happen however, just replace it with its contents.
    case PARENT_TYPE_INVALID:
        change.unwrapBlockByKey(node.key)
        break
    }
}


export default {
    blocks: {
        exercise: {
            nodes: [
                { types: ['exercise_problem'], min: 1, max: 1},
                { types: ['exercise_solution'], min: 0 },
                { types: ['exercise_commentary'], min: 0, max: 1 },
            ],
            normalize: normalizeExercise,
        },
        exercise_problem: {
            parent: { types: ['exercise'] },
            nodes: [
                { types: ['paragraph'], min: 1 },
            ],
            normalize: normalizeContent,
        },
        exercise_solution: {
            parent: { types: ['exercise'] },
            nodes: [
                { types: ['paragraph'], min: 1 },
            ],
            normalize: normalizeContent,
        },
        exercise_commentary: {
            parent: { types: ['exercise'] },
            nodes: [
                { types: ['paragraph'], min: 1 },
            ],
            normalize: normalizeContent,
        },
    },
}
