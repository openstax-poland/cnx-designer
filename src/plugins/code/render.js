// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'

export default function renderNode({ node, children, attributes }, editor, next) {
    if (node.type === 'code') {
        if (node.object === 'block') {
            return <pre {...attributes}>{children}</pre>
        } else if (node.object === 'inline') {
            return <code {...attributes}>{children}</code>
        }
    }

    return next()
}
