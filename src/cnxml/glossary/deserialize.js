// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { text, splitBlocks } from '../utils'

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
    seealso: 'definition_seealso',
    term: term,
}


/**
 * Process data for terms.
 */
function term(el, next) {
    if (el.parentElement && el.parentElement.tagName === 'meaning') {
        return
    }

    return splitBlocks({
        type: 'definition_term',
        nodes: next(el.childNodes),
    })
}


export default [
    BLOCK,
]
