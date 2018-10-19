import React from 'react'

export default function renderNode({ node, children, attributes }, next) {
    if (node.type !== 'admonition') return next()

    return <div
        className="admonition"
        data-type={node.data.get('type')}
        {...attributes}
        >
        {children}
    </div>
}
