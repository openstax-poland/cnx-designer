// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'

export default function renderNode(props, editor, next) {
    const { node, attributes, children } = props

    switch (node.type) {
        case 'table':
            return <div className="adr-table" {...attributes}>{children}</div>

        case 'caption':
            return <div className="adr-caption" {...attributes}>{children}</div>

        case 'tgroup':
            return <div className="adr-tgroup" {...attributes}>{children}</div>

        case 'colspec':
            return <div className="adr-colspec" {...attributes}>{children}</div>
        
        case 'spanspec':
            return <div className="adr-spanspec" {...attributes}>{children}</div>

        case 'thead':
            return <div className="adr-thead" {...attributes}>{children}</div>

        case 'tbody':
            return <div className="adr-tbody" {...attributes}>{children}</div>

        case 'tfoot':
            return <div className="adr-tfoot" {...attributes}>{children}</div>

        case 'row':
            return <div className="adr-row" {...attributes}>{children}</div>
        
        case 'entry':
            return <div className="adr-entry" {...attributes}>{children}</div>

        default:
            return next()
    }
}
