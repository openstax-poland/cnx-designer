// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'

export default function renderNode({ node, children, attributes }, editor, next) {
    if (node.type === 'source_element') {
        return <span className={`source source--${node.object}`} {...attributes}>
            {children}
        </span>
    }

    return next()
}
