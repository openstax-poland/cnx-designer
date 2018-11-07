// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import schema from './schema'
import * as commands from './commands'
import { renderNode, renderMark } from './render'

export default function Text() {
    return { commands, renderNode, renderMark, schema }
}
