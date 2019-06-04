// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import onKeyDown from './handlers'
import { renderBlock, renderInline } from './render'
import schema from './schema'

export default function Code(options) {
    return { onKeyDown, renderBlock, renderInline, schema }
}
