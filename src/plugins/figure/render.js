import React from 'react'
import { WithCounters } from 'slate-counters'

export default function renderNode(props) {
    const { node, children, attributes } = props

    switch (node.type) {
    case 'figure':
        return <figure {...attributes}>
            {children}
        </figure>

    case 'figure_caption':
        return <Caption {...props}/>
    }
}

const Caption = WithCounters(({ parent }) => parent.key)(function Caption({
    counters, children, attributes,
}) {
    const style = {
        counterReset: `figure ${counters.get('figure')}`,
    }

    return <figcaption {...attributes} style={style}>
        {children}
    </figcaption>
})
