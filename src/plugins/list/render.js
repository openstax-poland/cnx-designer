import React from 'react'

export default function renderNode({ node, children, attributes }, next) {
    switch (node.type) {
    case 'ul_list': return <ul {...attributes}>{children}</ul>
    case 'ol_list': return <ol {...attributes}>{children}</ol>

    case 'list_item':
        return <li {...attributes}>{children}</li>

    default:
        return next()
    }
}
