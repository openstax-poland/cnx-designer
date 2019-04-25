// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import schema from './schema'
import renderNode from './render'
import onKeyDown from './handlers'

export default function Source() {
    return { renderNode, schema, onKeyDown }
}
