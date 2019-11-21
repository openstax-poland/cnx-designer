// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

/**
 * De/serialization rules for document structure and elements.
 */

import React from 'react'

import {
    block,
    loadClasses,
    mixed,
    mixedContent,
    splitBlocks,
    text,
} from './util'
import { normalizeWhiteSpace } from './whitespace'
import { NAMESPACES } from './xml'

/**
 * Process data for admonitions.
 */
function de_admonition(el, next) {
    return {
        type: 'admonition',
        key: el.getAttribute('id') || undefined,
        data: {
            type: el.getAttribute('type') || 'note',
            class: loadClasses(el),
        },
        nodes: mixedContent(el, next),
    }
}

export const ADMONITION = block('note', de_admonition, 'admonition', 'note')

/**
 * Process data for captions.
 */
function de_figcaption(el, next) {
    const allowedParents = ['figure', 'subfigure']

    if (!allowedParents.includes(el.parentElement.tagName)) {
        return undefined
    }

    return splitBlocks({
        type: 'figure_caption',
        nodes: normalizeWhiteSpace(next(el.childNodes)),
    })
}

export const FIGURE_CAPTION = block(
    'caption', de_figcaption, 'figure_caption', 'caption')

/**
 * Process data for code tags.
 */
function de_code(el, next) {
    const display = el.getAttribute('display') || 'inline'
    const lang = el.getAttribute('lang')

    return {
        object: display === 'block' ? 'block' : 'inline',
        type: 'code',
        nodes: next(el.childNodes),
        data: {
            lang,
        },
    }
}

/**
 * Serializer for code.
 */
function se_code(obj, children) {
    const attrs = {}

    if (obj.object === 'block') {
        attrs.display = 'block'
        attrs.id = obj.key
    }

    if (obj.data.has('lang')) {
        attrs.lang = obj.data.get('lang')
    }

    return <code {...attrs}>
        {children}
    </code>
}

export const CODE = block('code', de_code, 'code', se_code)

export const COMMENTARY = block(
    'commentary',
    mixed('exercise_commentary'),
    'exercise_commentary',
    'commentary',
)

export const EXERCISE = block('exercise', 'exercise', 'exercise', 'exercise')

/**
 * Serializer for figures.
 */
function se_figure(obj, children) {
    const attrs = obj.data.get('class')
        ? { class: obj.data.get('class').join(' ') }
        : {}

    return <figure id={obj.key} {...attrs}>
        {/* We need to turn nested figures from <figure>s to <subfigure>s */}
        {children.map(el => el.type !== 'figure'
            ? el
            : {
                ...el,
                type: 'subfigure',
            },
        )}
    </figure>
}

export const FIGURE = block(
    ['figure', 'subfigure'], 'figure', 'figure', se_figure)

/**
 * Process data for images.
 */
function image(el) {
    return {
        type: 'image',
        isVoid: true,
        data: {
            src: el.getAttribute('src'),
        },
    }
}

export const IMAGE = block('image', image, 'image', 'image')

/**
 * Process data for list nodes.
 */
function de_list(el, next) {
    return {
        type: el.getAttribute('type') === 'enumerated' ? 'ol_list' : 'ul_list',
        data: {
            class: loadClasses(el),
        },
        nodes: next(Array.from(el.children)),
    }
}

/**
 * Serializer for lists.
 */
function se_list(obj, children) {
    const type = obj.type === 'ul_list' ? 'bulleted' : 'enumerated'

    const attrs = obj.data.get('class')
        ? { class: obj.data.get('class').join(' ') }
        : {}

    return <list id={obj.key} list-type={type} {...attrs}>
        {children}
    </list>
}

export const LIST = block('list', de_list, ['ol_list', 'ul_list'], se_list)

/**
 * Process data for item nodes.
 */
function de_list_item(el, next) {
    return {
        type: 'list_item',
        nodes: mixedContent(el, next),
    }
}

export const LIST_ITEM = block('item', de_list_item, 'list_item', 'item')

/**
 * Process data for media nodes.
 */
function de_media(el, next) {
    const alt = el.getAttribute('alt')
    const nodes = next(Array.from(el.children))

    return {
        type: 'media',
        data: {
            alt,
        },
        nodes,
    }
}

/**
 * Serializer for media.
 */
function se_media(obj, children) {
    const mediaAlt = obj.nodes.find(c => c.type === 'media_alt')

    return <media id={obj.key} alt={mediaAlt.text}>
        {children}
    </media>
}

export const MEDIA = block('media', de_media, 'media', se_media)

/**
 * Process data for media_alt nodes.
 */
function de_media_alt(el, next) {
    if (
        // TODO: Remove check for className === 'media-alt' after few weeks
        // when drafts will no longer contain those elements.
        el.className === 'media-alt'
        || (el.namespaceURI === NAMESPACES.editing && el.tagName === 'alt-text')
    ) {
        return {
            object: 'block',
            type: 'media_alt',
            nodes: next(Array.from(el.children)),
        }
    }

    return undefined
}

/**
 * Serializer for media_alt.
 *
 * Text from media_alt will always be saved in media alt attribute.
 * If it can't be properly serialized, for ex. because of suggestions inside of
 * it then additional <alt-text> will be added to the media block.
 */
function se_media_alt(obj, children) {
    if (obj.type === 'media_alt') {
        if (obj.nodes.some(n => n.object !== 'text')) {
            return <alt-text xmlns={NAMESPACES.editing}>{children}</alt-text>
        }

        return null
    }

    return undefined
}

export const ALT_TEXT = block(
    'alt-text', de_media_alt, 'media_alt', se_media_alt)
// TODO: Remove when drafts will no longer contain those elements.
export const MEDIA_ALT = block('div', de_media_alt, 'media_alt', se_media_alt)

export const PARA = block('para', text('paragraph'), 'paragraph', 'para')

/**
 * Process data for preformat tags.
 *
 * Preformat tag may in CNXML may have display="inline" attribute, but since
 * <pre> tag is block element we support only this variation.
 */
function de_preformat(el, next) {
    return {
        type: 'preformat',
        nodes: next(el.childNodes),
    }
}

/**
 * Serializer for preformat.
 */
function se_preformat(obj, children) {
    return <preformat id={obj.key}>
        {children}
    </preformat>
}

export const PREFORMAT = block(
    'preformat', de_preformat, 'preformat', se_preformat)

export const PROBLEM = block(
    'problem', 'exercise_problem', 'exercise_problem', 'problem')

export const QUOTE = block('quote', mixed('quotation'), 'quotation', 'quote')

export const SECTION = block('section', 'section', 'section', 'section')

export const SOLUTION = block(
    'solution', 'exercise_solution', 'exercise_solution', 'solution')

/**
 * Process data for table nodes.
 */
function de_table(el, next) {
    const nodes = next(Array.from(el.children))
    const data = {}
    Array.from(el.attributes).forEach(a => {
        data[a.name] = Number(a.value) >= 0 ? Number(a.value) : a.value
    })
    return {
        type: 'table',
        data,
        nodes,
    }
}

/**
 * Serializer for table.
 */
function se_table(obj, children) {
    const summary = obj.nodes.find(c => c.type === 'table_summary')

    return <table
        id={obj.key}
        {...obj.data.toJS()}
        summary={summary.text}
        >
        {children}
    </table>
}

export const TABLE = block('table', de_table, 'table', se_table)

/**
 * Process data for table summary nodes.
 */
function de_table_summary(el, next) {
    if (
        el.namespaceURI === NAMESPACES.editing
        && el.tagName === 'table-summary'
    ) {
        return {
            type: 'table_summary',
            nodes: next(Array.from(el.children)),
        }
    }

    return undefined
}

/**
 * Serializer for table_summary.
 *
 * Text from table_summary will always be saved in table summary attribute.
 * If it can't be properly serialized, for ex. because of suggestions inside of
 * it then additional <table-summary> will be added to the table block.
 */
function se_table_summary(obj, children) {
    if (obj.type === 'table_summary') {
        if (obj.nodes.some(n => n.object !== 'text')) {
            return <table-summary
                xmlns={NAMESPACES.editing}
                >
                {children}
            </table-summary>
        }

        return null
    }

    return undefined
}

export const TABLE_SUMMARY = block(
    'table-summary', de_table_summary, 'table_summary', se_table_summary)

/**
 * Process data for table captions.
 */
function de_table_caption(el, next) {
    if (el.parentElement.tagName !== 'table') {
        return undefined
    }

    return splitBlocks({
        type: 'table_caption',
        nodes: normalizeWhiteSpace(next(el.childNodes)),
    })
}

export const TABLE_CAPTION = block(
    'caption', de_table_caption, 'table_caption', 'caption')

/**
 * Process data for tgroup nodes.
 */
function de_table_tgroup(el, next) {
    const nodes = next(Array.from(el.children))
    const data = {}
    Array.from(el.attributes).forEach(a => {
        data[a.name] = Number(a.value) >= 0 ? Number(a.value) : a.value
    })
    return {
        type: 'table_tgroup',
        data,
        nodes,
    }
}

/**
 * Serializer for tgroup.
 */
function se_table_tgroup(obj, children) {
    return <tgroup
        id={obj.key}
        {...obj.data.toJS()}
        >
        {children}
    </tgroup>
}

export const TABLE_TGROUP = block(
    'tgroup', de_table_tgroup, 'table_tgroup', se_table_tgroup)

/**
 * Process data for colspec nodes.
 */
function de_table_colspec(el, next) {
    const nodes = next(Array.from(el.children))
    const data = {}
    Array.from(el.attributes).forEach(a => {
        data[a.name] = Number(a.value) >= 0 ? Number(a.value) : a.value
    })
    return {
        type: 'table_colspec',
        data,
        nodes,
    }
}

/**
 * Serializer for colspec.
 */
function se_table_colspec(obj) {
    return <colspec id={obj.key} {...obj.data.toJS()} />
}

export const TABLE_COLSPEC = block(
    'colspec', de_table_colspec, 'table_colspec', se_table_colspec)

/**
 * Process data for spanspec nodes.
 */
function de_table_spanspec(el, next) {
    const nodes = next(Array.from(el.children))
    const data = {}
    Array.from(el.attributes).forEach(a => {
        data[a.name] = Number(a.value) >= 0 ? Number(a.value) : a.value
    })
    return {
        type: 'table_spanspec',
        data,
        nodes,
    }
}

/**
 * Serializer for spanspec.
 */
function se_table_spanspec(obj) {
    return <spanspec id={obj.key} {...obj.data.toJS()} />
}

export const TABLE_SPANSPEC = block(
    'spanspec', de_table_spanspec, 'table_spanspec', se_table_spanspec)

/**
 * Process data for thead nodes.
 */
function de_table_thead(el, next) {
    const nodes = next(Array.from(el.children))
    const data = {}
    Array.from(el.attributes).forEach(a => {
        data[a.name] = Number(a.value) >= 0 ? Number(a.value) : a.value
    })
    return {
        type: 'table_thead',
        data,
        nodes,
    }
}

/**
 * Serializer for thead.
 */
function se_table_thead(obj, children) {
    return <thead
        id={obj.key}
        {...obj.data.toJS()}
        >
        {children}
    </thead>
}

export const TABLE_THEAD = block(
    'thead', de_table_thead, 'table_thead', se_table_thead)

/**
 * Process data for tbody nodes.
 */
function de_table_tbody(el, next) {
    const nodes = next(Array.from(el.children))
    const data = {}
    Array.from(el.attributes).forEach(a => {
        data[a.name] = Number(a.value) >= 0 ? Number(a.value) : a.value
    })
    return {
        type: 'table_tbody',
        data,
        nodes,
    }
}

/**
 * Serializer for tbody.
 */
function se_table_tbody(obj, children) {
    return <tbody
        id={obj.key}
        {...obj.data.toJS()}
        >
        {children}
    </tbody>
}

export const TABLE_TBODY = block(
    'tbody', de_table_tbody, 'table_tbody', se_table_tbody)

/**
 * Process data for tfoot nodes.
 */
function de_table_tfoot(el, next) {
    const nodes = next(Array.from(el.children))
    const data = {}
    Array.from(el.attributes).forEach(a => {
        data[a.name] = Number(a.value) >= 0 ? Number(a.value) : a.value
    })
    return {
        type: 'table_tfoot',
        data,
        nodes,
    }
}

/**
 * Serializer for tfoot.
 */
function se_table_tfoot(obj, children) {
    return <tfoot
        id={obj.key}
        {...obj.data.toJS()}
        >
        {children}
    </tfoot>
}

export const TABLE_TFOOT = block(
    'tfoot', de_table_tfoot, 'table_tfoot', se_table_tfoot)

/**
 * Process data for row nodes.
 */
function de_table_row(el, next) {
    const nodes = next(Array.from(el.children))
    const data = {}
    Array.from(el.attributes).forEach(a => {
        data[a.name] = Number(a.value) >= 0 ? Number(a.value) : a.value
    })
    return {
        type: 'table_row',
        data,
        nodes,
    }
}

/**
 * Serializer for row.
 */
function se_table_row(obj, children) {
    return <row
        id={obj.key}
        {...obj.data.toJS()}
        >
        {children}
    </row>
}

export const TABLE_ROW = block(
    'row', de_table_row, 'table_row', se_table_row)

/**
 * Process data for entry nodes.
 */
function de_table_entry(el, next) {
    const data = {}
    Array.from(el.attributes).forEach(a => {
        data[a.name] = Number(a.value) >= 0 ? Number(a.value) : a.value
    })
    return {
        type: 'table_entry',
        data,
        nodes: normalizeWhiteSpace(next(el.childNodes)),
    }
}

/**
 * Serializer for entry.
 */
function se_table_entry(obj, children) {
    return <entry
        id={obj.key}
        {...obj.data.toJS()}
        >
        {children}
    </entry>
}

export const TABLE_ENTRY = block(
    'entry', de_table_entry, 'table_entry', se_table_entry)

export const TITLE = block('title', text('title'), 'title', 'title')

export const DOCUMENT = [
    ADMONITION,
    ALT_TEXT,
    FIGURE_CAPTION,
    CODE,
    COMMENTARY,
    EXERCISE,
    FIGURE,
    IMAGE,
    LIST,
    LIST_ITEM,
    MEDIA,
    MEDIA_ALT,
    PARA,
    PREFORMAT,
    PROBLEM,
    QUOTE,
    SECTION,
    SOLUTION,
    TABLE,
    TABLE_CAPTION,
    TABLE_COLSPEC,
    TABLE_ENTRY,
    TABLE_ROW,
    TABLE_SPANSPEC,
    TABLE_SUMMARY,
    TABLE_TBODY,
    TABLE_TFOOT,
    TABLE_TGROUP,
    TABLE_THEAD,
    TITLE,
]
