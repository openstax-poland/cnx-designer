// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import onKeyDown from './handlers'
import renderBlock from './render'
import make_schema from './schema'

/**
 * @param {string[]} options.inlines - List of inline types which may appear
 *                                     inside a preformat fragment.
 * @param {string[]} options.marks - List of mark types which may appear inside
 *                                   a preformat.
 */
export default function Preformat(options={}) {
    const {
        inlines = [],
        marks = [],
    } = options

    const schema = make_schema({
        inlines,
        marks,
    })

    return { onKeyDown, renderBlock, schema }
}
