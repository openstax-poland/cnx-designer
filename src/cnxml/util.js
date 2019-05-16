// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

/**
 * Utility functions used de/serialisation runtimes.
 */

import React from 'react'

/**
 * A transformation function, mapping CNXML element to Slate node properties.
 * The resulting properties are then augmented, if missing, with `object` and
 * `key` properties.
 *
 * Two transformer functions are predefined for nodes with no custom properties:
 * `text` for elements containing only text, and `mixed` for element which can
 * contain either text or block content.
 *
 * @typedef BlockDeserializer
 * @function
 * @param {Element} el
 * @param {Function} next
 */

/**
 * @typedef BlockSerializer
 * @function
 * @param {Slate~Node} obj
 * @param {React~Element[]} children
 */

/**
 * Mark loading works similarly to loading block tags, except the transformer
 * function isn't given the children transformer, and children are instead
 * processed by {@link deserializeMark}.
 *
 * @typedef MarkDeserializer
 * @function
 * @param {Element} el
 */

/**
 *
 * Mark serialisation works similarly to block serialisation, except that the
 * default serializer function (the one used when value is a string) doesn't
 * produce the `id` attribute, and certain transformations (such as processing
 * of classes) are skipped.
 *
 * @typedef MarkDeserializer
 * @function
 * @param {Slate~Node} obj
 * @param {React~Element[]} children
 */

import { List } from 'immutable'

/**
 * Build a de/serializer for block elements.
 *
 * The first argument specifies test for XML elements to be deserialized by the
 * function specified in the second argument. The third argument specifies test
 * for Slate nodes to be serialized in the fourth argument.
 *
 * As a special case, if deserialization function is a string then the element
 * is loaded as a non-void block node with type determined by the argument, with
 * no special properties, and its children processed as blocks. If serialization
 * function is a string then the node is serialized as a tag with name
 * determined by the argument, its `id` property set to Slate key, its data
 * attributes turned into CNXML attributes, and its children serialized by Slate
 * with no changes.
 *
 * @param {string|string[]|null} type
 * @param {BlockDeserializer|string|null} de
 * @param {string|string[]|null} tagName
 * @param {BlockSerializer|string|null} se
 *
 * @see makeTest
 */
export function block(tagName, de, type, se) {
    const test_de = makeTest(tagName)
    const test_se = makeTest(type)

    return {
        deserialize(el, next) {
            if (test_de(el.tagName)) {
                return deserializeBlock(el, next, de)
            }
        },

        serialize(obj, children) {
            if (test_se(obj.type)) {
                return serializeBlock(obj, children, se)
            }
        },
    }
}

/**
 * Build a de/serializer for inline elements.
 *
 * Mark loading works similarly to loading block tags, except the transformer
 * function isn't given the children transformer, and children are instead
 * processed by {@link deserializeMark}.
 *
 * @param {string|string[]|null} tagName
 * @param {MarkDeserializer|string|null} de
 * @param {string|string[]|null} type
 * @param {MarkSerializer|string|null} se
 */
export function inline(tagName, de, type, se) {
    const test_de = makeTest(tagName)
    const test_se = makeTest(type)

    return {
        deserialize(el, next) {
            if (test_de(el.tagName)) {
                return deserializeMark(el, next, de)
            }
        },

        serialize(obj, children) {
            if (test_se(obj.type)) {
                return serializeMark(obj, children, se)
            }
        }
    }
}

function makeTest(type) {
    if (type == null) return _ => false

    if (type instanceof Array) return t => type.includes(t)

    if (typeof type === 'string') return t => type === t

    throw new Error(`Invalid test type: ${typeof test}`)
}

/**
 * Deserialize a block element.
 *
 * First two parameters are as for a normal `slate-html-serializer`
 * deserialization function, the third is a transformer function.
 *
 * @see block
 */
function deserializeBlock(el, next, block) {
    const props = block instanceof Function ? block(el, next) : {
        type: block,
        data: {
            class: loadClasses(el),
        },
        nodes: next(Array.from(el.children)),
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

/**
 * Serialize a block element.
 *
 * @see block
 */
function serializeBlock(obj, children, Block) {
    if (Block instanceof Function) return Block(obj, children)

    const data = obj.data.toJS()

    if (!data.class) {
        // Remove empty classes
        delete data['class']
    } else {
        data.class = data.class.join(' ')
    }

    return <Block id={obj.key} {...data}>
        {children}
    </Block>
}

/**
 * Deserialize an inline element as  a Slate mark.
 *
 * First two parameters are as for a normal `slate-html-serializer`
 * deserialization function, the third is a transformer function.
 *
 * @see inline
 */
function deserializeMark(el, next, mark) {
    const props = mark instanceof Function ? mark(el) : { type: mark }

    return {
        object: 'mark',
        key: el.getAttribute('id') || undefined,
        nodes: next(el.childNodes),
        ...props,
    }
}

/**
 * Serialize an inline element or a mark.
 *
 * @see inline
 */
function serializeMark(obj, children, Mark) {
    if (Mark instanceof Function) return Mark(obj, children)

    return <Mark {...obj.data.toJS()}>
        {children}
    </Mark>
}

/**
 * Tags which are only used in-line, mixed with text nodes.
 *
 * This array is used to differentiate between tags with only block tags, and
 * tags with mixed content (inline tags and text).
 *
 * @see mixedContent
 */
export const INLINE_TAGS = [
    'emphasis',
    'footnote',
    'foreign',
    'link',
    'sub',
    'sup',
    'term',
]

/**
 * Load content as either a sequence of block nodes, or text wrapped in a block
 * node.
 */
export function mixedContent(el, next, type='paragraph') {
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
 * Create transformer function for nodes containing just text.
 */
export const text = type => (el, next) => splitBlocks({
    type: type,
    nodes: next(el.childNodes),
})

/**
 * Create transformer function for nodes containing either just text or block
 * content.
 */
export const mixed = type => (el, next) => ({
    type: type,
    data: {
        class: loadClasses(el),
    },
    nodes: mixedContent(el, next),
})

/**
 * One of CNXML's quirks is that it allows certain block elements inside runs
 * of text, which is both silly and not supported by Slate. This function
 * normalizes such cases by moving those nested blocks out, splitting the text
 * block when necessary.
 */
export function splitBlocks(node) {
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
export function loadClasses(el) {
    const classes = el.getAttribute('class')

    if (!classes) return List([])

    return List(classes.trim().split(/\s+/))
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
export const DEFAULT = {
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
