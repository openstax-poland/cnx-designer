// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

/**
 * De/serialization rules for document structure and elements.
 */

/* eslint-disable react/no-unknown-property */

import React from 'react'

import { block, mixed, text, loadClasses, mixedContent, splitBlocks } from './util'
import { normalizeWhiteSpace } from './whitespace'

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
        return
    }

    return splitBlocks({
        type: 'figure_caption',
        nodes: normalizeWhiteSpace(next(el.childNodes)),
    })
}

export const FIGURE_CAPTION = block('caption', de_figcaption, 'figure_caption', 'caption')

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
    let attrs = {}

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

export const COMMENTARY = block('commentary', mixed('exercise_commentary'), 'exercise_commentary', 'commentary')

export const EXERCISE = block('exercise', 'exercise', 'exercise', 'exercise')

/**
 * Serializer for figures.
 */
function se_figure(obj, children) {
    let attrs = obj.data.get('class') ? {class: obj.data.get('class').join(' ') } : {}

    return <figure id={obj.key} {...attrs}>
        {/* We need to turn nested figures from <figure>s to <subfigure>s */}
        {children.map(el => el.type !== 'figure' ? el : {
            ...el,
            type: 'subfigure',
        })}
    </figure>
}

export const FIGURE = block(['figure', 'subfigure'], 'figure', 'figure', se_figure)

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

    let attrs = obj.data.get('class') ? {class: obj.data.get('class').join(' ') } : {}

    return <list list-type={type} {...attrs}>
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

    return <media alt={mediaAlt.text}>
        {children}
    </media>
}

export const MEDIA = block('media', de_media, 'media', se_media)

/**
 * Process data for media_alt nodes.
 */
function de_media_alt(el, next) {
    if (el.className === 'media-alt') {
        return {
            object: 'block',
            type: 'media_alt',
            nodes: next(Array.from(el.children)),
        }
    }
}

/**
 * Serializer for media_alt.
 *
 * Text from media_alt will always be saved in media alt attribute.
 * If it can't be properly serialized, for ex. because of suggestions inside of it
 * then additional div.media-alt will be added to the media block.
 */
function se_media_alt(obj, children) {
    if (obj.type === 'media_alt') {
        if (obj.nodes.some(n => n.object !== 'text')) {
            return <div class="media-alt">{children}</div>
        }
        return null
    }
}

export const MEDIA_ALT = block('div', de_media_alt, 'media_alt', se_media_alt)

export const PARA = block('para', text('paragraph'), 'paragraph', 'para')

export const PROBLEM = block('problem', 'exercise_problem', 'exercise_problem', 'problem')

export const QUOTE = block('quote', mixed('quotation'), 'quotation', 'quote')

export const SECTION = block('section', 'section', 'section', 'section')

export const SOLUTION = block('solution', 'exercise_solution', 'exercise_solution', 'solution')

export const TITLE = block('title', text('title'), 'title', 'title')

export const DOCUMENT = [
    ADMONITION,
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
    PROBLEM,
    QUOTE,
    SECTION,
    SOLUTION,
    TITLE,
]
