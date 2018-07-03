import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { WithCounters } from 'slate-counters'

export default function renderNode(props) {
    const { node, attributes, children } = props

    // eslint-disable-next-line default-case
    switch (node.type) {
    case 'xref': return <Reference {...props} />

    case 'link':
        <a href={node.data.get('url')} {...attributes}>{children}</a>
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
