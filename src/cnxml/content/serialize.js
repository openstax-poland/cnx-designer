// Copyright 2018 OpenStax Poland
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

        let data = obj.data.toJS()

        if (!data.class) {
            // Remove empty classes
            delete data['class']
        } else {
            data.class = data.class.join(' ')
        }

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
    admonition: 'note',
    code: code,
    exercise: 'exercise',
    exercise_commentary: 'commentary',
    exercise_problem: 'problem',
    exercise_solution: 'solution',
    figure: figure,
    figure_caption: 'caption',
    image: 'image',
    list_item: 'item',
    media: 'media',
    ol_list: list,
    quotation: 'quote',
    section: 'section',
    title: 'title',
    ul_list: list,
}


/**
 * Serializer for code.
 */
function code(obj, children) {
    let attrs = {}

    if (obj.object === 'block') {
        attrs.display = 'block'
        attrs.id = obj.key
    }

    return <code {...attrs}>
        {children}
    </code>
}


/**
 * Serializer for figures.
 */
function figure(obj, children) {
    let attrs = obj.data.get('class') ? {class: obj.data.get('class').join(' ') } : {}

    return <figure id={obj.key} {...attrs}>
        {/* We need to turn nested figures from <figure>s to <subfigure>s */}
        {children.map(el => el.type !== 'figure' ? el : {
            ...el,
            type: 'subfigure',
        })}
    </figure>
}


/**
 * Serializer for lists.
 */
function list(obj, children) {
    const type = obj.type === 'ul_list' ? 'bulleted' : 'enumerated'

    let attrs = obj.data.get('class') ? {class: obj.data.get('class').join(' ') } : {}

    return <list list-type={type} {...attrs}>
        {children}
    </list>
}


export default [
    BLOCK,
]
