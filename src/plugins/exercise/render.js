// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'
import { WithCounters } from 'slate-counters'

const TYPES = [
    'exercise',
    'exercise_problem',
    'exercise_solution',
    'exercise_commentary',
]

/* eslint-disable react/prop-types */
export default function renderBlock(props, editor, next) {
    const { node, children, attributes } = props

    if (node.type === 'exercise' || node.type === 'exercise_solution') {
        return <Exercise {...props} />
    }

    if (!TYPES.includes(node.type)) return next()

    return <div
        className={node.type.replace('_', '-')}
        {...attributes}
        >
        {children}
    </div>
}
/* eslint-enable react/prop-types */

/* eslint-disable-next-line prefer-arrow-callback */
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
