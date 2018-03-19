/** @jsx createMenu */

import { Block, Text } from 'slate'

import createMenu from '../actions'

import * as utils from './utils'


function insertExercise(change) {
    change.withoutNormalization(change => {
        change.wrapBlock('exercise')
        change.wrapBlock('exercise_problem')
    })
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
