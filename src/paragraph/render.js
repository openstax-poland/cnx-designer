import React from 'react'


export default function renderNode({ node, children, attributes }) {
    if (node.type === 'paragraph') {
        return <p {...attributes}>{children}</p>
    }
}
