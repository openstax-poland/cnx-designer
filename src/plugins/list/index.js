// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import EditList from 'slate-edit-list'

import * as commands from './commands'
import renderBlock from './render'
import make_schema from './schema'

/**
 * @param {EditList~OptionsFormat} options - Object with options for EditList
 *                                           plugin.
 * @param {string[]} options.content - List of node types which
 *                                     are allowed inside list items.
 */
export default function List(options) {
    const list = EditList(options)
    const schema = make_schema(options)
    const plugin = { commands, renderBlock, schema }
    return [plugin, list]
}
