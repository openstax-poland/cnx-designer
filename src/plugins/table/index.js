// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import renderBlock from './render'
import make_schema from './schema'
import onKeyDown from './handlers'
import * as commands from './commands'
import * as queries from './queries'

/**
 * @param {string[]} options.inlines - List of inline types which
 *                                     may appear inside a caption and summary.
 * @param {string[]} options.entry_types - List of node types which may appear
 *                                         inside an entry.
 */
export default function Tables(options) {
    const {
        inlines = [],
        entry_types = [],
    } = options

    const schema = make_schema({ inlines, entry_types })

    return {
        renderBlock,
        schema,
        onKeyDown,
        commands,
        queries,
    }
}
