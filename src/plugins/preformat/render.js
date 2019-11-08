// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'

export default function renderBlock(
    { node, children, attributes },
    editor,
    next,
) {
    if (node.type === 'preformat') {
        return <pre className="preformat" {...attributes}>{children}</pre>
    }

    return next()
}
