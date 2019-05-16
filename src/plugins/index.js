// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import Admonition from './admonition'
import Exercise from './exercise'
import Figure from './figure'
import List from './list'
import Media from './media'
import Quotation from './quotation'
import Section from './section'
import Term from './term'
import Text from './text'
import Title from './title'
import XReference from './xref'
import Code from './code'

export { default as Persistence } from './persistence'
export { default as Storage } from './storage'

export {
    Admonition,
    Code,
    Exercise,
    Figure,
    List,
    Media,
    Quotation,
    Section,
    Term,
    Text,
    Title,
    XReference,
}

/**
 * Collection of plugins for working with text content of a CNX document.
 */
export function TextContent(options={}) {
    return [
        Code(),
        Term(),
        Text(),
        XReference(),
    ]
}

/**
 * Collection of plugins for working with CNX documents.
 *
 * This also includes {@link Content}
 *
 * @param {object} options.content options for the {@link Content} plugin
 * @param {object} options.list    options for `slate-edit-list`
 */
export function Document(options={}) {
    const {
        content = {},
        list = {},
    } = options

    return [
        Admonition(),
        TextContent(content),
        Exercise(),
        Figure(),
        List(list),
        Media(),
        Quotation(),
        Section(),
        Title(),
    ]
}
