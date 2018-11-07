// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'

export default function renderNode({ node, children, attributes }, next) {
    if (node.type !== 'section') return next()

    return <section {...attributes}>
        {children}
    </section>
}
