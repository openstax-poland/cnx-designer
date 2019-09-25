// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import renderBlock from './render'
import make_schema from './schema'
import * as queries from './queries'

/**
 * @param {string[]} options.inlines - List of inline types which may appear inside
 *                                     an alt text.
 */
export default function Media(options) {
    const {
        inlines = [],
    } = options

    const schema = make_schema({ inlines })

    return { renderBlock, schema, queries }
}
