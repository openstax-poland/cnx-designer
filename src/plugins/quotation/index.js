// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import onKeyDown from './handlers'
import renderBlock from './render'
import make_schema from './schema'
import * as queries from './queries'

/**
 * @param {string[]} options.content - List of block node types allowed inside
 *                                     a quotation.
 */
export default function Quotation(options={}) {
    const {
        content = ['paragraph'],
    } = options

    const schema = make_schema({ content })

    return { queries, schema, onKeyDown, renderBlock }
}
