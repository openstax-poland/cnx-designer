// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import renderBlock from './render'
import make_schema from './schema'
import onKeyDown from './handlers'
import * as commands from './commands'
import * as queries from './queries'

/**
 * @param {string[]} options.content - List of block node types allowed within
 *                                     an definition_meaning/example.
 * @param {string[]} options.inlines - List of inline node types allowed within
 *                                     an definition_term.
 */
export default function Definition(options={}) {
    const {
        content = ['paragraph'],
        inlines = [],
    } = options

    const schema = make_schema({ content, inlines })

    return { commands, queries, onKeyDown, schema, renderBlock }
}
