// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { text, loadClasses } from '../utils'

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
    'term',
]


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
    para: text('paragraph'),
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
    term: term,
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
 * Process data for terms.
 */
function term(el) {
    const reference = el.getAttributeNS('http://katalysteducation.org/cmlnle/1.0', 'reference') || el.innerHTML

    return {
        object: 'mark',
        type: 'term',
        data: { reference },
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
    MARK,
    DEFAULT,
]
