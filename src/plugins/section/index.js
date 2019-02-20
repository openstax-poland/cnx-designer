// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import renderNode from './render'
import schema from './schema'
import * as commands from './commands'
import * as queries from './queries'

export default function Section(options) {
    return { commands, queries, renderNode, schema }
}
