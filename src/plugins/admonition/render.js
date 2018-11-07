// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'

export default function renderNode({ node, children, attributes }, next) {
    if (node.type !== 'admonition') return next()

    return <div
        className="admonition"
        data-type={node.data.get('type')}
        {...attributes}
        >
        {children}
    </div>
}
