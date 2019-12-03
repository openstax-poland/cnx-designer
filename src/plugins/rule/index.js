// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import make_schema from './schema'
import renderBlock from './render'
import onKeyDown from './handlers'
import renderXRef from './xref'
import * as commands from './commands'
import * as queries from './queries'

/**
 * @param {string[]} options.content - List of block node types allowed inside
 *                                     a rule.
 */

export default function Rule(options={}) {
    const {
        content = ['paragraph'],
    } = options

    const schema = make_schema({ content })

    return { commands, queries, schema, renderBlock, renderXRef, onKeyDown }
}
