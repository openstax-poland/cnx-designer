import React from 'react'


export default function renderNode({ node, children, attributes }) {
    if (node.type === 'title') {
        return <h2 className="title" {...attributes}>{children}</h2>
    }
}
