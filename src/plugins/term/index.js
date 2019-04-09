// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import * as commands from './commands'
import * as queries from './queries'
import { renderMark } from './render'

export default function Term() {
    return { commands, queries, renderMark }
}
