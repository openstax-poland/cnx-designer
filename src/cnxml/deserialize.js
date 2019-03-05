// Copyright 2018 OpenStax Poland
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
            nodes: normalize(next(Array.from(el.children)), 'block', 'paragraph'),
        }

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
            nodes: normalize(next(el.childNodes), 'transparent'),
            ...props,
        }
    }
}


/**
 * Default handler.
 *
 * This handler will handle all elements and convert them into Slate-JSON-like
 * objects with `object: 'invalid'` and `nodes` equal to what
 * `slate-html-serializer` would normally generate for an unknown element.
 */
const DEFAULT = {
    deserialize(el, next) {
        if (el.nodeType !== el.ELEMENT_NODE) {
            return
        }

        return {
            object: 'invalid',
            nodes: next(el.childNodes),
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
 * Create transformer function for nodes containing just text.
 */
const text = type => (el, next) => splitBlocks({
    type: type,
    nodes: normalize(next(el.childNodes), 'transparent'),
})


/**
 * Create transformer function for nodes containing either just text or block
 * content.
 */
const mixed = type => (el, next) => ({
    type: type,
    nodes: normalize(mixedContent(el, next), 'block', 'paragraph'),
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
    caption: text('figure_caption'),
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
 * Process data for admonitions.
 */
function admonition(el, next) {
    return {
        type: 'admonition',
        key: el.getAttribute('id') || undefined,
        data: {
            type: el.getAttribute('type') || 'note',
        },
        nodes: normalize(mixedContent(el, next), 'block', 'paragraph'),
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

    if (target) {
        return {
            object: 'inline',
            type: 'xref',
            isVoid: true,
            data: { target },
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
        nodes: next(Array.from(el.children)),
    }
}


/**
 * Process data for item nodes.
 */
function item(el, next) {
    return {
        type: 'list_item',
        nodes: normalize(mixedContent(el, next), 'block', 'paragraph'),
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
 * Process a list of Slate-JSON nodes which may contain an `object: 'invalid'`
 * node into an one which doesn't.
 *
 * What is done with an `object: 'invalid'` node depends on value of `action`:
 *
 * - `block` will turn all _invalid_ nodes into blocks with type equal
 *   to `param`, and normalize nested node lists with `action = 'transparent'`;
 *
 * - `inline` will turn all _invalid_ nodes into inlines with type equal
 *   to `param`, and normalize nested node lists with `action = 'inline'`;
 *
 * - `transparent` will replace any _invalid_ node with normalized contents
 *   of its nested node list. In this mode `param` is ignored;
 *
 * - `skip` will completely ignore any _invalid_ node. In this mode `param`
 *   is ignored.
 */
function normalize(nodes, action='transparent', param) {
    if (nodes.every(node => node.object !== 'invalid')) {
        return nodes
    }

    let res = []

    for (const node of nodes) {
        if (node.object === 'invalid') {
            switch (action) {
            case 'block':
                res.push({
                    object: 'block',
                    type: param,
                    nodes: normalize(node.nodes, 'transparent')
                })
                break

            case 'inline':
                res.push({
                    object: 'inline',
                    type: param,
                    nodes: normalize(node.nodes, 'inline', param),
                })
                break

            case 'transparent':
                res = res.concat(normalize(node.nodes, 'transparent'))
                break

            case 'skip':
                break

            default:
                throw new Error('Invalid normalize action: ' + action)
            }
        } else {
            res.push(node)
        }
    }

    return res
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
    MARK,
    DEFAULT,
]
