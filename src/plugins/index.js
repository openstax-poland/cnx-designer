// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import Admonition from './admonition'
import Classes from './classes'
import Definition from './definition'
import Exercise from './exercise'
import Figure from './figure'
import Footnote from './footnote'
import GlossaryDocument from './glossary'
import List from './list'
import Media from './media'
import Preformat from './preformat'
import Quotation from './quotation'
import Section from './section'
import Term from './term'
import Text from './text'
import Title from './title'
import XReference from './xref'
import Code from './code'

export { default as Persistence } from './persistence'

export {
    Admonition,
    Code,
    Definition,
    Exercise,
    Figure,
    Footnote,
    List,
    Media,
    Preformat,
    Quotation,
    Section,
    Term,
    Text,
    Title,
    XReference,
}

const DEFAULT_TEXT_OPTIONS = {
    preformat: {
        inlines: ['code', 'docref', 'link', 'term', 'xref'],
    },
}

/**
 * Collection of plugins for working with text content of a CNX document.
 *
 * @param {string[]|null} options.marks List of additional mark types allowed
 *                                      in text content.
 * @param {object?} options.code options for `Code`
 * @param {object?} options.preformat options for `Preformat`
 * @param {object?} options.term options for `Term`
 */
export function TextContent(options=DEFAULT_TEXT_OPTIONS) {
    const marks = [
        ...options.marks || [],
        'strong',
        'emphasis',
        'underline',
        'superscript',
        'subscript',
    ]

    return [
        Code(options.code),
        Footnote({ marks }),
        Preformat({ marks, ...options.preformat }),
        Term({ marks, ...options.term }),
        Text({ marks }),
        XReference(),
    ]
}

/**
 * Collection of plugins for working with CNX documents.
 *
 * This also includes {@link TextContent}
 *
 * @param {string[]} options.content additional block node types allowed in
 *                                   text-block content
 * @param {string[]} options.document_content additional block node types
 *                                            allowed as children of section
 *                                            and document
 * @param {string[]|null} options.marks List of additional mark types allowed
 *                                      in text content.
 * @param {string[]} options.media options for media plugin.
 * @param {object} options.text options for `TextContent`
 * @param {object} options.list options for `slate-edit-list`
 */
export function Document(options={}) {
    const {
        list = {
            content: [
                'ul_list',
                'ol_list',
                'paragraph',
            ],
        },
    } = options

    const content = [
        ...options.content || [],
        'paragraph',
        'preformat',
        'quotation',
        'ul_list',
        'ol_list',
        'code',
        'figure',
    ]

    const document_content = [
        ...options.document_content || [],
        ...content,
        'admonition',
        'exercise',
        'figure',
        'section',
    ]

    const marks = [
        ...options.marks || [],
        'strong',
        'emphasis',
        'underline',
        'superscript',
        'subscript',
    ]

    const class_types = [
        'admonition',
        'exercise',
        'figure',
        'section',
    ]

    return [
        Admonition({
            title: 'title',
            content,
        }),
        TextContent({
            marks: options.marks,
            ...options.text,
        }),
        Exercise({ content }),
        Figure(),
        List(list),
        Media({ ...options.media }),
        Quotation({ content }),
        Section({ content: document_content }),
        Title({ marks }),
        Classes({ types: class_types }),
    ]
}

/**
 * Collection of plugins for working with CNX glossary.
 *
 * This also includes {@link TextContent}
 *
 * @param {string[]} options.content additional block node types allowed in
 *                                   text-block content
 * @param {string[]} options.glossary_content additional block node types
 *                                            allowed as children of document
 * @param {string[]|null} options.marks List of additional mark types allowed
 *                                      in text content.
 * @param {object} options.definition additional options for definition plugin.
 * @param {object} options.text options for `TextContent`
 * @param {object} options.list options for `slate-edit-list`
 */
export function Glossary(options={}) {
    const {
        list = {
            content: [
                'ul_list',
                'ol_list',
                'paragraph',
            ],
        },
    } = options

    const content = [
        ...options.content || [],
        'paragraph',
        'quotation',
        'ul_list',
        'ol_list',
        'code',
    ]

    const glossary_content = [
        ...options.document_content || [],
        'definition',
    ]

    return [
        Definition({ content, ...options.definition }),
        GlossaryDocument({ content: glossary_content }),
        List(list),
        TextContent({
            marks: options.marks,
            ...options.text,
        }),
    ]
}
