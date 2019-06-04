// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'

const NODES = {
    paragraph: 'p',
}

const MARKS = {
    emphasis: 'em',
    underline: 'u',
    superscript: 'sup',
    subscript: 'sub',
    strong: 'strong',
}

export function renderBlock({ node, children, attributes }, editor, next) {
    const Node = NODES[node.type]

    if (Node) {
        return <Node {...attributes}>{children}</Node>
    }

    return next()
}

export function renderDecoration({ mark, children, attributes }, editor, next) {
    const Mark = MARKS[mark.type]

    if (Mark) {
        return <Mark {...attributes}>{children}</Mark>
    }

    return next()
}
