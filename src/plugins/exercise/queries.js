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
    const { document, blocks } = value
    const first = blocks.first()

    // No selection
    if (!first) return null

    const path = document.getPath(first.key)

    let node = document
    for (const index of path) {
        node = node.nodes.get(index)

        if (node.type === 'exercise') {
            return node
        }
    }

    return null
}
