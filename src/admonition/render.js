import React from 'react'


export default function renderNode({ node, children, attributes }) {
    if (node.type !== 'admonition') return null

    return (
    <div
        className="admonition"
        data-type={node.data.get('type')}
        {...attributes}
    >
        {children}
    </div>
    )
}
