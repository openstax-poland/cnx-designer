import React from 'react'


const TYPES = [
    'exercise',
    'exercise_problem',
    'exercise_solution',
    'exercise_commentary',
]


export default function renderNode({ node, children, attributes }) {
    if (!TYPES.includes(node.type)) return null

    return (
    <div
        className={node.type.replace('_', '-')}
        {...attributes}
    >
        {children}
    </div>
    )
}
