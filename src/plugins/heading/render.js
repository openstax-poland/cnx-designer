// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'

export default function renderNode({ node, children, attributes }, next) {
    if (node.type === 'heading') {
        const Tag = ['h2', 'h3', 'h4', 'h5'][node.data.get('depth')] || 'h6'

        return <Tag {...attributes}>{children}</Tag>
    }

    return next()
}
