// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import renderInline from './render'
import make_schema from './schema'

const ALLOWED_INLINES = ['code', 'docref', 'link', 'term', 'xref']

/**
 * @param {string[]} options.data - Object with data items and their
 *                                  validation functions.
 * @param {string[]} options.marks - List of mark types which may appear inside
 *                                   a footnote.
 */
export default function Footnote(options={}) {
    const {
        marks = [],
        inlines = [],
    } = options

    const schema = make_schema({ marks, inlines: ALLOWED_INLINES.concat(inlines) })

    return { renderInline, schema }
}
