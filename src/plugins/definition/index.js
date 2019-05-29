// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import renderNode from './render'
import make_schema from './schema'
import onKeyDown from './handlers'
import * as commands from './commands'
import * as queries from './queries'

/**
 * @param {string[]} options.content - List of block node types allowed within
 *                                     an definition_meaning/example.
 */
export default function Definition(options={}) {
    const {
        content = ['paragraph'],
    } = options

    const schema = make_schema({ content })

    return { commands, queries, onKeyDown, schema, renderNode }
}
