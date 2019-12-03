// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'
import { WithCounters } from 'slate-counters'

const TYPES = ['rule', 'rule_statement', 'rule_proof', 'rule_example']

/* eslint-disable react/prop-types */
export default function renderBlock(props, editor, next) {
    if (!TYPES.includes(props.node.type)) return next()

    return <Rule {...props} />
}
/* eslint-enable react/prop-types */

/* eslint-disable-next-line prefer-arrow-callback */
const Rule = WithCounters(({ node }) => node.key)(function Rule({
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
