// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'

export default function renderBlock(
    { node, children, attributes },
    editor,
    next,
) {
    switch (node.type) {
    case 'ul_list': return <ul {...attributes}>{children}</ul>
    case 'ol_list': return <ol {...attributes}>{children}</ol>

    case 'list_item':
        return <li {...attributes}>{children}</li>

    default:
        return next()
    }
}
