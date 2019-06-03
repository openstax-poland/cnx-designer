// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import make_schema from './schema'

/**
 * @param {string[]} options.types - List of block node types which can have
 *                                   classes.
 */
export default function Classes(options={}) {
    const {
        types = [],
    } = options

    const schema = make_schema(types)

    return { schema }
}
