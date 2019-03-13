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

    if (mark.type === 'suggestion') {
        let data = {}

        if (mark.data.has('type')) {
            data['data-type'] = mark.data.get('type')
        }

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
