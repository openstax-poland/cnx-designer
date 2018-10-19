import React from 'react'

export default function renderNode({ node, children, attributes }, next) {
    if (node.type !== 'title') return next()

    // TODO: appropriate tags when nesting sections
    return <h2 className="title" {...attributes}>{children}</h2>
}
