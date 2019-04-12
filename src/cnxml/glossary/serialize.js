// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'

/**
 * Serialize a block element.
 *
 * @see BLOCK_TAGS
 */
const BLOCK = {
    serialize(obj, children) {
        const Block = BLOCK_TAGS[obj.type]
        if (!Block) return

        if (Block instanceof Function) return Block(obj, children)

        const data = obj.data.toJS()

        return <Block id={obj.key} {...data}>
            {children}
        </Block>
    },
}


/**
 * Serialize a mark.
 *
 * @see MARK_TAGS
 */
const MARK = {
    serialize(obj, children) {
        const Mark = MARK_TAGS[obj.type]
        if (!Mark) return

        if (Mark instanceof Function) return Mark(obj, children)

        return <Mark {...obj.data.toJS()}>
            {children}
        </Mark>
    },
}


/**
 * Tags which can occur in block content.
 *
 * Keys are Slate node types, values are _transformer functions_. Transformer
 * functions map Slate nodes to CNXML elements.
 *
 * As a special case, if value is a string then the node is serialized as a tag
 * with name determined by the value, its `id` property set to Slate key, its
 * data attributes turned into CNXML attributes, and its children serialized
 * by Slate with no changes.
 *
 * @see BLOCK
 */
const BLOCK_TAGS = {
    definition: 'definition',
    definition_example: 'example',
    definition_meaning: 'meaning',
    definition_seealso: 'seealso',
    definition_term: 'term',
    paragraph: 'para',
}


/**
 * Mark serialisation works similarly to block serialisation, except the default
 * function (the one used when value is a string) doesn't produce the
 * `id` attribute.
 *
 * @see MARK
 * @see BLOCK_TAGS
 */
const MARK_TAGS = {
    //term: term,
}


/**
 * Serializer for terms.
 */
function term(obj, children) {
    return <term>
        {children}
    </term>
}


export default [
    BLOCK,
    MARK,
]
