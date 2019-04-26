// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'

export default function renderNode({ node, children, attributes }, editor, next) {
    if (node.type === 'source_element') {
        if (node.object === 'block') {
            return <div className="source source--block" {...attributes}>
                {children}
            </div>
        }
        return <span className="source source--inline" {...attributes}>
            {children}
        </span>
    }

    return next()
}
