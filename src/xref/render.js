import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { WithCounters } from 'slate-counters'

export default function renderNode({ node, ...props }) {
    // eslint-disable-next-line default-case
    switch (node.type) {
    case 'xref': return <Reference node={node} {...props} />
    case 'link': return <Link node={node} {...props} />
    }
}


const Reference = WithCounters(({ node }) => node.data.get('target'))(
function Reference({ node, editor, attributes, counters }) {
    const targetKey = node.data.get('target')
    const target = editor.value.document.getNode(targetKey)

    let text

    if (target) {
        text = editor.stack.find('renderXRef', target, counters) || `(${target.type})`
    } else {
        console.warn('Undefined target:', targetKey, 'in', node.key)
        text = "(undefined target)"
    }

    const onClick = ev => {
        ev.preventDefault()
        ev.stopPropagation()

        const target = document.querySelector(`[data-key="${targetKey}"]`)

        if (target) {
            target.scrollIntoView()
        }
    }

    return <a href={"#" + targetKey} onClick={onClick} {...attributes}>
        {text}
    </a>
})


function Link({ node, attributes, children }) {
    const url = node.data.get('url')

    return <a href={url} {...attributes}>{children}</a>
}
