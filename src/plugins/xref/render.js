// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'
import { WithCounters } from 'slate-counters'

export default function renderInline(props, editor, next) {
    const { node, attributes, children } = props

    switch (node.type) {
    case 'xref':
        return <Reference {...props} />

    case 'docref':
        return <a href={node.data.get('document')} {...attributes}>{children}</a>

    case 'link':
        return <a href={node.data.get('url')} {...attributes}>{children}</a>

    default:
        return next()
    }
}

const Reference = WithCounters(({ node }) => node.data.get('target'))(
function Reference({ node, editor, attributes, counters }) {
    const targetKey = node.data.get('target')
    const target = editor.value.document.getNode(targetKey)

    let text

    if (target) {
        text = editor.run('renderXRef', target, counters) || `(${target.type})`
    } else {
        console.warn('Undefined target:', targetKey, 'in', node.key)
        text = "(undefined target)"
    }

    return <a href={"#" + targetKey} onClick={onClickReference} {...attributes} data-target={targetKey}>
        {text}
    </a>
})

function onClickReference(ev) {
    ev.preventDefault()
    ev.stopPropagation()

    const targetKey = ev.target.dataset.target
    const target = document.querySelector(`[data-key="${targetKey}"]`)

    if (target) {
        target.scrollIntoView()
    }
}
