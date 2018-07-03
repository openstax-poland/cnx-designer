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

export function renderNode({ node, children, attributes }) {
    const Node = NODES[node.type]

    if (Node) {
        return <Node {...attributes}>{children}</Node>
    }
}

export function renderMark({ mark, children, attributes }) {
    const Mark = MARKS[mark.type]

    if (Mark) {
        return <Mark {...attributes}>{children}</Mark>
    }
}
