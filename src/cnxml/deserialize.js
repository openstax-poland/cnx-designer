// Copyright 2018 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { List } from 'immutable'
import { Text } from 'slate'

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
 * Load marks.
 *
 * @see MARK_TAGS
 */
const MARK = {
    deserialize(el, next) {
        const inline = MARK_TAGS[el.tagName]
        if (!inline) return

        const props = inline instanceof Function ? inline(el, next) : {
            type: inline,
        }

        if (props == null) return

        return {
            object: 'mark',
            key: el.getAttribute('id') || undefined,
            nodes: next(el.childNodes),
            ...props,
        }
    }
}


/**
 * Default handler.
 *
 * When Slate can't find handler for a particular element it will skip it and
 * deserialize its children, as if “unwrapping” them. This works fine for
 * unknown inline nodes, but not for unknown blocks. Instead this handler will
 * first try to determine whether given unknown element is used as a block or
 * an inline, and replace blocks in paragraphs.
 */
const DEFAULT = {
    deserialize(el, next) {
        if (el.nodeType !== Node.TEXT_NODE && SOURCE_TAGS.includes(el.localName.toLowerCase())) {
            const parentsForInlines = ['para', 'caption']
            let data = {
                object: 'block',
                type: 'source_element',
                nodes: [Text.create(el.outerHTML)],
            }
            if (parentsForInlines.includes(el.parentElement.tagName)) {
                data.object = 'inline'
            }
            return data
        }

        if (el.nodeType !== Node.ELEMENT_NODE) {
            return
        }

        const ref = el.previousSibling
            ? el.parentNode.childNodes[0]
            : el.parentNode.childNodes[el.parentNode.childNodes.length - 1]
        const text = ref.nodeType === ref.TEXT_NODE && ref.textContent.match(/[^\s]/)

        if (text || INLINE_TAGS.includes(ref.tagName)) {
            return next(el.childNodes)
        } else {
            return mixedContent(el, next)
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
]

/**
 * We do not support fully those elements yet so for now they are 
 * transformed into normal text so magicians can edit them in
 * source mode.
 */

const SOURCE_TAGS = [
    'equation',
    'foreign',
    'math',
    'proof',
    'statement',
    'rule', 
]


/**
 * Create transformer function for nodes containing just text.
 */
const text = type => (el, next) => splitBlocks({
    type: type,
    nodes: next(el.childNodes),
})


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
    para: text('paragraph'),
    problem: 'exercise_problem',
    quote: mixed('quotation'),
    section: 'section',
    solution: 'exercise_solution',
    subfigure: 'figure',
    title: text('title'),
}


/**
 * Mark loading works similarly to loading block tags, except the transformer
 * function isn't given the children transformer, and children are instead
 * processed by {@link MARK}.
 *
 * @see MARK
 * @see BLOCK_TAGS
 */
const MARK_TAGS = {
    emphasis: emphasis,
    sub: 'subscript',
    sup: 'superscript',
    link: xref,
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
 * Process data for emphasis marks.
 */
function emphasis(el) {
    const EFFECTS = {
        bold: 'strong',
        italics: 'emphasis',
        underline: 'underline',
    }

    return {
        type: EFFECTS[el.getAttribute('effect') || 'bold'] || 'strong',
    }
}


/**
 * Process data for links and cross-references.
 */
function xref(el) {
    const target = el.getAttribute('target-id') || null
    const url = el.getAttribute('url') || null
    const cmlnleCase = el.getAttributeNS('http://katalysteducation.org/cmlnle/1.0', 'case') || null

    if (target) {
        return {
            object: 'inline',
            type: 'xref',
            isVoid: true,
            data: { target, case: cmlnleCase },
        }
    } else if (url) {
        return {
            object: 'inline',
            type: 'link',
            data: { url },
        }
    } else {
        // TODO: notify user perhaps?
        return null
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


/**
 * One of CNXML's quirks is that it allows certain block elements inside runs
 * of text, which is both silly and not supported by Slate. This function
 * normalizes such cases by moving those nested blocks out, splitting the text
 * block when necessary.
 */
function splitBlocks(node) {
    if (node.nodes.every(node => node.object !== 'block')) {
        return node
    }

    const res = []

    let nodes = []
    let start = 0

    for (const child of node.nodes) {
        if (child.object !== 'block') {
            nodes.push(child)
            continue
        }

        if (nodes.length > 0) {
            res.push({ ...node, nodes })
            nodes = []
        }

        res.push(child)
    }

    if (nodes.length > 0) {
        res.push({ ...node, nodes })
    }

    return res
}


/**
 * Return element's classes as an array.
 */
const loadClasses = (el) => {
    const classes = el.getAttribute('class')

    if (!classes) return List([])

    return List(classes.trim().split(/\s+/))
}


export default [
    BLOCK,
    MARK,
    DEFAULT,
]
