// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import renderNode from './render'
import make_schema from './schema'

/**
 * @param {string[]} options.marks - List of mark types which may appear inside
 *                                   a title.
 */
export default function Title(options={}) {
    const {
        marks = [],
    } = options

    const schema = make_schema({ marks })

    return { renderNode, schema }
}
