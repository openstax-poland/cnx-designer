// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import onKeyDown from './handlers'
import { renderBlock, renderInline } from './render'
import make_schema from './schema'

/**
 * @param {string[]} options.inlines - List of inline types which may appear
 *                                     inside a code fragment.
 */
export default function Code(options={}) {
    const {
        inlines = [],
    } = options

    const schema = make_schema({ inlines })

    return { onKeyDown, renderBlock, renderInline, schema }
}
