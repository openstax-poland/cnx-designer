import React from 'react'


export default function renderNode({ node, children, attributes }) {
    switch (node.type) {
    case 'figure':
        return <figure {...attributes}>
            {children}
        </figure>

    case 'figure_caption':
        return <figcaption {...attributes}>{children}</figcaption>
    }
}
