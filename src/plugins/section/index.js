// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import renderBlock from './render'
import make_schema from './schema'
import * as commands from './commands'
import * as queries from './queries'

export default function Section(options={}) {
    const {
        content = ['paragraph', 'section'],
    } = options

    const schema = make_schema({ content })

    return { commands, queries, renderBlock, schema }
}
