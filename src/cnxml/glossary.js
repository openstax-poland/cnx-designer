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

    children.forEach(c => {
        if (c.type === 'example') {
            examples.push(c)
        } else {
            meaning_children.push(c)
        }
    })

    if (examples.length === 0) {
        return <meaning>
            {meaning_children}
        </meaning>
    }

    return <>
        <meaning>
            {meaning_children}
        </meaning>
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

    return {
        type: 'definition_term',
        nodes: next(el.childNodes),
    }
}

export const DEFINITION_TERM = block('term', de_term, 'definition_term', 'term')

export const GLOSSARY = [
    DEFINITION,
    MEANING,
    EXAMPLE,
    SEEALSO,
    DEFINITION_TERM,
    PARA,
]
