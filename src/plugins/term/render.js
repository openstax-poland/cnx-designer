// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'

/* eslint-disable react/prop-types */
export default function renderInline({ node, children, attributes }, editor, next) {
    if (node.type !== 'term') return next()

    return <span className="term" {...attributes}>{children}</span>
}
/* eslint-enable react/prop-types */
