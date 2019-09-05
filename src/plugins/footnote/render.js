// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'

export default function renderInline({ node, children, attributes }, editor, next) {
    if (node.type !== 'footnote') return next()

    return <span className="footnote" {...attributes}>{children}</span>
}
