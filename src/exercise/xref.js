export default function renderXRef(target, counters) {
    switch (target.type) {
    case 'exercise':
    case 'exercise_problem':
        return `Exercise ${counters.get('exercise')}`

    case 'exercise_solution':
        return `Solution ${counters.get('exercise')}.${counters.get('exercise_solution')}`

    case 'exercise_commentary':
        return `Commentary ${counters.get('exercise')}`
    }
}
