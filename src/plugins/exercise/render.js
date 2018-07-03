import React from 'react'
import { WithCounters } from 'slate-counters'

const TYPES = [
    'exercise',
    'exercise_problem',
    'exercise_solution',
    'exercise_commentary',
]

export default function renderNode(props) {
    const { node, children, attributes } = props

    switch (node.type) {
    case 'exercise':
    case 'exercise_solution':
        return <Exercise {...props} />
    }

    if (!TYPES.includes(node.type)) return null

    return <div
        className={node.type.replace('_', '-')}
        {...attributes}
        >
        {children}
    </div>
}

const Exercise = WithCounters(({ node }) => node.key)(function Exercise({
    node, children, attributes, counters,
}) {
    const style = {
        counterReset: `${node.type} ${counters.get(node.type, 0)}`,
    }

    return <div
        className={node.type.replace('_', '-')}
        style={style}
        {...attributes}
        >
        {children}
    </div>
})
