// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import renderInline from './render'
import make_schema from './schema'

/**
 * @param {string[]} options.data - Object with data items and their
 *                                  validation functions.
 * @param {string[]} options.marks - List of mark types which may appear inside
 *                                   a footnote.
 */
export default function Term(options={}) {
    const {
        marks = [],
        inlines = [],
    } = options

    const schema = make_schema({ marks, inlines })

    return { renderInline, schema }
}
