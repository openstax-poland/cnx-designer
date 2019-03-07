// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import onKeyDown from './handlers'
import renderNode from './render'
import schema from './schema'
import * as queries from './queries'

export default function Quotation() {
    return { queries, schema, onKeyDown, renderNode }
}
