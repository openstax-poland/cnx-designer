import React from 'react'

export default function renderNode({ node, children, attributes }, next) {
    if (node.type !== 'section') return next()

    return <section {...attributes}>
        {children}
    </section>
}
