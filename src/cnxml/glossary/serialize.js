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
}

export default [
    BLOCK,
]
