// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'

export function renderMark({ mark, children, attributes }, editor, next) {
    if (mark.type === 'term') {
        return <span className="term" {...attributes}>{children}</span>
    }

    return next()
}
