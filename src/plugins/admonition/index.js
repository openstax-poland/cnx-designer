// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import onKeyDown from './handlers'
import renderBlock from './render'
import make_schema from './schema'
import * as commands from './commands'
import * as queries from './queries'

/**
 * @param {string|null} options.title - Type of block node to use as title, or
 *                                      null to disable.
 * @param {string[]} options.content - List of block node types allowed within
 *                                     an admonition.
 */
export default function Admonition(options={}) {
    const {
        title = null,
        content = ['paragraph'],
    } = options

    const schema = make_schema({ title, content })

    return { commands, queries, schema, onKeyDown, renderBlock }
}
