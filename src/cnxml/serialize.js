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
    admonition: 'note',
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
    paragraph: 'para',
    source_element: source,
    quotation: 'quote',
    section: 'section',
    title: 'title',
    ul_list: list,
}


/**
 * Serializer for CNXML emphasis tag.
 */
const emphasis = type => function(obj, children) {
    return <emphasis effect={type}>{children}</emphasis>
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
    emphasis: emphasis('italics'),
    link: 'link',
    strong: emphasis('bold'),
    subscript: 'sub',
    superscript: 'sup',
    underline: emphasis('underline'),
    xref: xref,
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


/**
 * Serializer for source elements.
 */
function source(obj, children) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(obj.getText().trim(), 'text/xml')
    let el = document.createElement('template')
    el.innerHTML = xmlDoc.documentElement.outerHTML

    const error = xmlDoc.getElementsByTagName('parsererror')
    if (error.length) {
        return <para>
            Error: {error[0].textContent}
            Content: {obj.getText()}
        </para>
    }
    
    return <>{el.content.childNodes}</>
}


/**
 * Serializer for cross-references.
 */
function xref(obj, children) {
    let attrs = {
        'target-id': obj.data.get('target'),
    }

    const cmlnleCase = obj.data.get('case')

    if (cmlnleCase) {
        attrs['cmlnleCase'] = cmlnleCase
    }

    return <link {...attrs}>
        {children}
    </link>
}


export default [
    BLOCK,
    MARK,
]
