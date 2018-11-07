// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import schema from './schema'
import renderNode from './render'
import onKeyDown from './handlers'
import renderXRef from './xref'
import * as commands from './commands'
import * as queries from './queries'

export default function Exercise(options={}) {
    return { commands, queries, schema, renderNode, renderXRef, onKeyDown }
}
