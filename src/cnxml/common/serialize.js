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
 * Serialize text.
 *
 * `slate-html-serializer` replaces newlines in text with `<br>` HTML elements,
 * which are not supported in CNXML. Instead we just emit newlines, as they
 * don't pose any problems in CNXML.
 *
 * As an additional benefit, this makes it simpler to write serializers for
 * nodes, such as `code`, in which newlines have special meaning and must
 * be preserved.
 */
const TEXT = {
    serialize(obj, children) {
        if (obj.object === 'string') return [children]
    }
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
    paragraph: 'para',
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
    term: term,
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


/**
 * Serializer for terms.
 */
function term(obj, children) {
    let attrs = {}

    const reference = obj.data.get('reference')
    if (reference && reference !== obj.text) {
        attrs['cmlnleReference'] = reference
    }

    return <term {...attrs}>
        {children}
    </term>
}


export default [
    BLOCK,
    MARK,
    TEXT,
]
