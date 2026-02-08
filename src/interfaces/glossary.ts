// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Descendant, Node } from 'slate'

/** List of definitions of terms, used alongside contents of a document */
export interface Glossary {
    type: 'glossary'
    children: Descendant[]
}

export const Glossary = {
    /** Check if value of unknown type is a glossary */
    isGlossary(this: void, value: Node | undefined | null): value is Glossary {
        return value != null && Node.isElement(value) && value.type === 'glossary'
    },
}

/**
 * A term
 *
 * This element can be used as an inline in text to mark it as a term, for
 * inclusion in an index or formatting. It can also be used as a key of
 * a {@link Definition}.
 */
export interface Term {
    type: 'term'
    index?: string
    reference?: string
    children: Descendant[]
}

/**
 * A term that goes into name index
 */
export interface NameTerm extends Term {
    index: 'name'
    name?: string
    born?: number
    died?: number
}

export const Term = {
    /** Check if value of unknown type is a term */
    isTerm(this: void, value: Node | undefined | null): value is Term {
        return value != null && Node.isElement(value) && value.type === 'term'
    },
    isNameTerm(this: void, value: Node | undefined | null): value is NameTerm {
        return Term.isTerm(value) && value.index === 'name'
    },
}

/**
 * Definition of a term
 *
 * Definitions can be used either in the document content, or as entries in the
 * glossary.
 */
export interface Definition {
    type: 'definition'
    children: Descendant[]
}

export const Definition = {
    /** Check if value of unknown type is a definition */
    isDefinition(this: void, value: Node | undefined | null): value is Definition {
        return value != null && Node.isElement(value) && value.type === 'definition'
    },
}

/**
 * Term which is defined by a {@link Definition}
 *
 * This interface is the same as {@link Term} except that it is a block element
 * meant to be used as a child of {@link Definition}.
 */
export interface DefinitionTerm {
    type: 'definition_term'
    reference?: string
    children: Descendant[]
}

export const DefinitionTerm = {
    /** Check if value of unknown type is a term of a definition */
    isDefinitionTerm(this: void, value: Node | undefined | null): value is DefinitionTerm {
        return value != null && Node.isElement(value) && value.type === 'definition_term'
    },
}

/** Meaning of a term */
export interface Meaning {
    type: 'definition_meaning'
    children: Descendant[]
}

export const Meaning = {
    /** Check if value of unknown type is a meaning of a definition */
    isMeaning(this: void, value: Node | undefined | null): value is Meaning {
        return value != null && Node.isElement(value) && value.type === 'definition_meaning'
    },
}

/** Example usage of a term. */
export interface DefinitionExample {
    type: 'definition_example'
    children: Descendant[]
}

export const DefinitionExample = {
    /** Check if value of unknown type is an example usage of a definition */
    isDefinitionExample(this: void, value: Node | undefined | null): value is DefinitionExample {
        return value != null && Node.isElement(value) && value.type === 'definition_example'
    },
}

/** Reference to other related terms */
export interface SeeAlso {
    type: 'definition_seealso'
    children: Descendant[]
}

export const SeeAlso = {
    /**
     * Check if value of unknown type is a reference to other related
     * definitions
     */
    isSeeAlso(this: void, value: Node | undefined | null): value is SeeAlso {
        return value != null && Node.isElement(value) && value.type === 'definition_seealso'
    },
}
