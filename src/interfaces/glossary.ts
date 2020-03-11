// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Element } from 'slate'

/** List of definitions of terms, used alongside contents of a document */
export interface Glossary extends Element {
    type: 'glossary'
}

export const Glossary = {
    /** Check if value of unknown type is a glossary */
    isGlossary(value: unknown): value is Glossary {
        return Element.isElement(value) && value.type === 'glossary'
    },
}

/**
 * A term
 *
 * This element can be used as an inline in text to mark it as a term, for
 * inclusion in an index or formatting. It can also be used as a key of
 a {@link Definition}.
 */
export interface Term extends Element {
    type: 'term'
    reference?: string
}

export const Term = {
    /** Check if value of unknown type is a term */
    isTerm(value: unknown): value is Term {
        return Element.isElement(value) && value.type === 'term'
    }
}

/**
 * Definition of a term
 *
 * Definitions can be used either in the document content, or as entries in the
 * glossary.
 */
export interface Definition extends Element {
    type: 'definition'
}

export const Definition = {
    /** Check if value of unknown type is a definition */
    isDefinition(value: unknown): value is Definition {
        return Element.isElement(value) && value.type === 'definition'
    },
}

/** Meaning of a term */
export interface Meaning extends Element {
    type: 'definition_meaning'
}

export const Meaning = {
    /** Check if value of unknown type is a meaning of a definition */
    isMeaning(value: unknown): value is Meaning {
        return Element.isElement(value) && value.type === 'definition_meaning'
    },
}

/** Example usage of a term. */
export interface DefinitionExample extends Element {
    type: 'definition_example'
}

export const DefinitionExample = {
    /** Check if value of unknown type is an example usage of a definition */
    isDefinitionExample(value: unknown): value is DefinitionExample {
        return Element.isElement(value) && value.type === 'definition_example'
    },
}

/** Reference to other related terms */
export interface SeeAlso extends Element {
    type: 'definition_seealso'
}

export const SeeAlso = {
    /**
     * Check if value of unknown type is a reference to other related
     * definitions
     */
    isSeeAlso(value: unknown): value is SeeAlso {
        return Element.isElement(value) && value.type === 'definition_seealso'
    },
}
