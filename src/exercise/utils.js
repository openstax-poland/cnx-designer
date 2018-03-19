export function getCurrentExercise(value) {
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
