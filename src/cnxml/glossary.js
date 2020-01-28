// Copyright 2019 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import React from 'react'

/**
 * De/serialization rules for document structure and elements.
 */

import { PARA } from './document'
import { block, mixed } from './util'

export const DEFINITION = block(
    'definition', 'definition', 'definition', 'definition')

function se_meaning(obj, children) {
    const meaning_children = []
    const examples = []

    for (const c of children) {
        if (c.type === 'example') {
            examples.push(c)
        } else {
            meaning_children.push(c)
        }
    }

    const meaning = <meaning id={obj.key}>
        {meaning_children}
    </meaning>

    return <>
        {meaning}
        {examples}
    </>
}

export const MEANING = block(
    'meaning', mixed('definition_meaning'), 'definition_meaning', se_meaning)

export const EXAMPLE = block(
    'example', mixed('definition_example'), 'definition_example', 'example')

export const SEEALSO = block(
    'seealso', 'definition_seealso', 'definition_seealso', 'seealso')

/**
 * Process data for terms.
 */
function de_term(el, next) {
    if (el.parentElement && el.parentElement.tagName === 'meaning') {
        return undefined
    }

    const data = {}

    const reference = el.getAttributeNS(
        'http://katalysteducation.org/cmlnle/1.0', 'reference')
    if (
        reference != null
        && el.parentElement
        && el.parentElement.tagName === 'definition'
    ) {
        data.reference = reference
    }

    return {
        type: 'definition_term',
        data,
        nodes: next(el.childNodes),
    }
}

/**
 * Serializer for terms.
 */
function se_term(obj, children) {
    const attrs = {}

    const reference = obj.data.get('reference')
    if (reference && reference !== obj.text) {
        attrs.cmlnleReference = reference
    }

    return <term {...attrs}>
        {children}
    </term>
}

export const DEFINITION_TERM = block(
    'term', de_term, 'definition_term', se_term)

export const GLOSSARY = [
    DEFINITION,
    MEANING,
    EXAMPLE,
    SEEALSO,
    DEFINITION_TERM,
    PARA,
]
