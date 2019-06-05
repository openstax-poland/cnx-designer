// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import make_schema from './schema'
import * as commands from './commands'
import { renderBlock, renderMark } from './render'

/**
 * @param {string[]} options.marks - List of mark types which may appear inside
 *                                   a paragraph.
 */
export default function Text(options={}) {
    const {
        marks = ['emphasis', 'underline', 'superscript', 'subscript', 'strong'],
    } = options

    const schema = make_schema({ marks })

    return { commands, renderBlock, renderMark, schema }
}
