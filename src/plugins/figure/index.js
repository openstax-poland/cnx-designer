// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import schema from './schema'
import renderBlock from './render'
import renderXRef from './xref'
import * as commands from './commands'
import * as queries from './queries'

export default function Figure() {
    return { commands, queries, schema, renderBlock, renderXRef }
}
