// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import renderBlock from './render'
import make_schema from './schema'
import * as queries from './queries'

/**
 * @param {string[]} options.inlines - List of inline types which may appear
 *                                     inside an alt text.
 * @param {Function} options.mediaUrl - Return URL for given media file.
 * @param {Function} options.nodes - List of nodes to match
 *                                   for schema validation.
 */
export default function Media(options) {
    const {
        inlines = [],
        mediaUrl = name => name,
        nodes = [
            { match: { type: 'image' }, min: 1 },
            { match: { type: 'media_alt' }, min: 1, max: 1 },
        ],
    } = options

    const schema = make_schema({ inlines, nodes })

    return {
        renderBlock: renderBlock(mediaUrl),
        schema,
        queries,
    }
}
