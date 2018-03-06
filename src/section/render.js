import React from 'react'


export default function renderNode({ node, children, attributes }) {
    if (node.type !== 'section') return null

    return <section {...attributes}>
        {children}
    </section>
}
