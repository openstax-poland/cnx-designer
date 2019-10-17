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
 */
export default function Media(options) {
    const {
        inlines = [],
        mediaUrl = name => name,
    } = options

    const schema = make_schema({ inlines })

    return {
        renderBlock: renderBlock(mediaUrl),
        schema,
        queries,
    }
}
