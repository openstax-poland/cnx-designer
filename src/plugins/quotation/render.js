// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'

/* eslint-disable react/prop-types */
export default function renderBlock({ node, children, attributes }, editor, next) {
    if (node.type !== 'quotation') return next()

    return <blockquote {...attributes}>
        {children}
    </blockquote>
}
/* eslint-enable react/prop-types */
