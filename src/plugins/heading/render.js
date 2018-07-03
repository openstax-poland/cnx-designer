import React from 'react'

export default function renderNode({ node, children, attributes }) {
    if (node.type === 'heading') {
        const Tag = ['h2', 'h3', 'h4', 'h5'][node.data.get('depth')] || 'h6'

        return <Tag {...attributes}>{children}</Tag>
    }
}
