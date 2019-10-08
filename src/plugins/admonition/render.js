// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'

/* eslint-disable react/prop-types */
export default function renderBlock({ node, children, attributes }, editor, next) {
    if (node.type !== 'admonition') return next()

    return <div
        className="admonition"
        data-type={node.data.get('type')}
        {...attributes}
        >
        {children}
    </div>
}
/* eslint-enable react/prop-types */
