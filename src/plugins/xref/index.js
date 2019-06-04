// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import schema from './schema'
import renderInline from './render'
import * as commands from './commands'

export default function XReference(options={}) {
    return { commands, schema, renderInline }
}
