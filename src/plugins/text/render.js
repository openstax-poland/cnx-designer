// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'

const NODES = {
    paragraph: 'p',
}

const MARKS = {
    strong: 'strong',
    emphasis: 'em',
    underline: 'u',
    superscript: 'sup',
    subscript: 'sub',
}

export function renderNode({ node, children, attributes }, editor, next) {
    const Node = NODES[node.type]

    if (Node) {
        return <Node {...attributes}>{children}</Node>
    }

    return next()
}

export function renderMark({ mark, children, attributes }, editor, next) {
    const Mark = MARKS[mark.type]

    if (Mark) {
        return <Mark {...attributes}>{children}</Mark>
    }

    let data = {}
    Object.entries(mark.data.toJS()).forEach(([key, val]) => {
        data[`data-${key}`] = val.toString()
    })

    if (mark.type === 'suggestion') {
        return <span
            className={mark.type}
            {...data}
            {...attributes}
            >
                {children}
            </span>
    }

    return next()
}
