// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'

const TYPES = [
    'definition',
    'definition_term',
    'definition_meaning',
    'definition_example',
    'definition_seealso',
]

/* eslint-disable react/prop-types */
export default function renderBlock({ node, children, attributes }, editor, next) {
    if (!TYPES.includes(node.type)) return next()

    return <div
        className={node.type.replace('_', '-')}
        {...attributes}
        >
        {children}
    </div>
}
/* eslint-enable react/prop-types */
