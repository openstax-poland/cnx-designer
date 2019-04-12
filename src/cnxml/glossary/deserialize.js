// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

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
    'term',
]


/**
 * Create transformer function for nodes containing just text.
 */
const text = type => (el, next) => splitBlocks({
    type: type,
    nodes: next(el.childNodes),
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
    definition: 'definition',
    example: text('definition_example'),
    meaning: text('definition_meaning'),
    para: text('paragraph'),
    seealso: 'definition_seealso',
    term: text('definition_term'),
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

export default [
    BLOCK,
    DEFAULT,
]
