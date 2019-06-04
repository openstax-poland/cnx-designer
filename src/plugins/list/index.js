// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import EditList from 'slate-edit-list'

import * as commands from './commands'
import renderBlock from './render'

export default function List(options) {
    const list = EditList(options)
    const plugin = { commands, renderBlock }
    return [plugin, list]
}
