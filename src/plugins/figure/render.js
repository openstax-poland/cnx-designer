// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'
import { WithCounters } from 'slate-counters'

export default function renderBlock(props, editor, next) {
    const { node, children, attributes } = props

    switch (node.type) {
    case 'figure':
        return <figure {...attributes}>
            {children}
        </figure>

    case 'figure_caption':
        return <Caption {...props}/>

    default:
        return next()
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
