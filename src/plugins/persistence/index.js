// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { onChange } from './handlers'

/**
 * @param {DocumentDB} options.db
 */
export default function Persistence(options) {
    const { db } = options

    return {
        onChange: onChange(db),
    }
}
