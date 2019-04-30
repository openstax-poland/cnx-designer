// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { text, splitBlocks, loadClasses } from '../utils'

/**
 * Load a block element.
 *
 * @see BLOCK_TAGS
 */
const BLOCK = {
    deserialize(el, next) {
        const block = BLOCK_TAGS[el.tagName]
        if (!block) return

        const props = block instanceof Function ? block(el, next) : {
            type: block,
            data: {
                class: loadClasses(el),
            },
            nodes: next(Array.from(el.children)),
        }

        if (props == null) return

        if (props instanceof Array) {
            props[0].key = props[0].key || el.getAttribute('id') || undefined

            for (const node of props) {
                if (!node.object) {
                    node.object = 'block'
                }
            }

            return props
        }

        return {
            object: 'block',
            key: el.getAttribute('id') || undefined,
            ...props,
        }
    }
}


/**
 * Tags which are only used in-line, mixed with text nodes.
 *
 * This array is used to differentiate between tags with only block tags, and
 * tags with mixed content (inline tags and text).
 *
 * @see mixedContent
 */
const INLINE_TAGS = [
    'emphasis',
    'footnote',
    'foreign',
    'link',
    'sub',
    'sup',
    'term',
]


/**
 * Create transformer function for nodes containing either just text or block
 * content.
 */
const mixed = type => (el, next) => ({
    type: type,
    data: {
        class: loadClasses(el),
    },
    nodes: mixedContent(el, next),
})


/**
 * Tags which can occur in block content.
 *
 * Keys are CNXML tag names, values are _transformer functions_. Transformer
 * functions map CNXML elements to Slate node properties. The resulting
 * properties are then augmented, if missing, with `object` and `key`
 * properties.
 *
 * Two transformer functions are predefined for nodes with no custom properties:
 * `text` for elements containing only text, and `mixed` for element which can
 * contain either text or block content.
 *
 * As a special case, if value is a string then the element is loaded as a
 * non-void block node with type determined by the value, with no special
 * properties, and its children processed as blocks.
 *
 * @see BLOCK
 */
const BLOCK_TAGS = {
    caption: caption,
    commentary: mixed('exercise_commentary'),
    exercise: 'exercise',
    figure: 'figure',
    image: image,
    item: item,
    list: list,
    media: media,
    note: admonition,
    problem: 'exercise_problem',
    section: 'section',
    solution: 'exercise_solution',
    subfigure: 'figure',
    title: text('title'),
}


/**
 * Process data for captions.
 */
function caption(el, next) {
    const allowedParents = ['figure', 'subfigure']

    if (!allowedParents.includes(el.parentElement.tagName)) {
        return
    }

    return splitBlocks({
        type: 'figure_caption',
        nodes: next(el.childNodes),
    })
}


/**
 * Process data for admonitions.
 */
function admonition(el, next) {
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


/**
 * Process data for list nodes.
 */
function list(el, next) {
    return {
        type: el.getAttribute('type') === 'enumerated' ? 'ol_list' : 'ul_list',
        data: {
            class: loadClasses(el),
        },
        nodes: next(Array.from(el.children)),
    }
}


/**
 * Process data for item nodes.
 */
function item(el, next) {
    return {
        type: 'list_item',
        nodes: mixedContent(el, next),
    }
}


/**
 * Process data for media nodes.
 */
function media(el, next) {
    return {
        type: 'media',
        data: {
            alt: el.getAttribute('alt'),
        },
        nodes: next(Array.from(el.children)),
    }
}


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


/**
 * Load content as either a sequence of block nodes, or text wrapped in a block
 * node.
 */
function mixedContent(el, next, type='paragraph') {
    if (el.childNodes.length === 0) {
        return []
    }

    const cl = el.childNodes[0]
    const text = cl.nodeType === cl.TEXT_NODE && cl.textContent.match(/[^\s]/)

    if (text || INLINE_TAGS.includes(cl.tagName)) {
        const nodes = next(el.childNodes)

        return [{
            object: 'block',
            type: type,
            nodes: nodes,
        }]
    } else {
        return next(Array.from(el.children))
    }
}


export default [
    BLOCK,
]
