// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import renderInline from './render'
import make_schema from './schema'

/**
 * @param {string[]} options.marks - List of mark types which may appear inside
 *                                   a foreign.
 */
export default function Foreign(options={}) {
    const {
        marks = [],
    } = options

    const schema = make_schema({ marks })

    return { renderInline, schema }
}
