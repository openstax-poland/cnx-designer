// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

export function getCounterDefinitions(editor, definitions) {
    definitions.push({
        exercise: {
            exercise: 'enter',
            exercise_solution: 'enclose',
        },
        exercise_solution: {
            exercise_solution: 'enter',
        },
    })
}

export function getActiveExercise(editor, value) {
    const { document } = value

    const block = value.startBlock
    if (!block) return null

    const parent = document.getParent(block.key)
    if (!parent) return null

    switch (parent.type) {
    case 'exercise':
        return parent

    case 'exercise_problem':
    case 'exercise_solution':
    case 'exercise_commentary':
        return document.getParent(parent.key)

    default:
        return null
    }
}
