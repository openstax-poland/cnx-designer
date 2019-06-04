// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'

export function renderBlock({ node, children, attributes }, editor, next) {
    if (node.type === 'code') {
        return <pre {...attributes}>{children}</pre>
    }

    return next()
}

export function renderInline({ node, children, attributes }, editor, next) {
    if (node.type === 'code') {
        return <code {...attributes}>{children}</code>
    }

    return next()
}
