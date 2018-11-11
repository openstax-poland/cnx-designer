// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'

export default function renderNode({ node, children, attributes }, editor, next) {
    if (node.type !== 'title') return next()

    // TODO: appropriate tags when nesting sections
    return <h2 className="title" {...attributes}>{children}</h2>
}
