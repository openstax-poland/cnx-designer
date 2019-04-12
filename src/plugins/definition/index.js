// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import renderNode from './render'
import schema from './schema'
import onKeyDown from './handlers'
import * as commands from './commands'
import * as queries from './queries'

export default function Definition() {
    return { commands, queries, onKeyDown, schema, renderNode }
}
