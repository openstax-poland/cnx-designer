// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Element } from 'slate'

/** Reference to a named element in this or another document. */
export interface CrossReference extends Element {
    type: 'xref'
    /** Identifier of the target element. */
    target: string
    /**
     * Identifier of the document in which target is located.
     *
     * A null value indicates that the target is in this document.
     */
    document: string | null
    /** Grammatical case in which the reference should be rendered */
    case?: Case
}

export const CrossReference = {
    /** Check if value of unknown type is a cross-reference */
    isCrossReference(this: void, value: unknown): value is CrossReference {
        return Element.isElement(value) && value.type === 'xref'
    },

    /** Check if value of unknown type is a valid grammatical case */
    isCase(this: void, value: unknown): value is Case {
        return CASES.includes(value as Case)
    },
}

/** Reference to another document */
export interface DocumentReference extends Element {
    type: 'docref'
    /** Identifier of the target document */
    document: string
    /** Grammatical case in which the reference should be rendered */
    case?: Case
}

export const DocumentReference = {
    /** Check if value of unknown type is a reference to another document */
    isDocumentReference(this: void, value: unknown): value is DocumentReference {
        return Element.isElement(value) && value.type === 'docref'
    },
}

/** A hyperlink */
export interface Link extends Element {
    type: 'link'
    url: string
}

export const Link = {
    /** Check if value of unknown type is a hyperlink */
    isLink(this: void, value: unknown): value is Link {
        return Element.isElement(value) && value.type === 'link'
    },
}

/** Grammatical case in which the reference should be rendered */
export type Case = typeof _CASES[number]

const _CASES = [
    "abessive",
    "ablative",
    "ablative",
    "absolutive",
    "accusative",
    "accusative",
    "adessive",
    "adverbial",
    "agentive",
    "allative",
    "antessive",
    "apudessive",
    "aversive",
    "benefactive",
    "causal",
    "causal-final",
    "comitative",
    "comparative",
    "dative",
    "delative",
    "distributive",
    "egressive",
    "elative",
    "equative",
    "ergative",
    "ergative-genitive",
    "essive",
    "essive",
    "essive-formal",
    "essive-modal",
    "exessive",
    "formal",
    "genitive",
    "identical",
    "illative",
    "inessive",
    "initiative",
    "instructive",
    "instrumental",
    "instrumental-comitative",
    "intransitive",
    "intrative",
    "lative",
    "locative",
    "nominative",
    "objective",
    "oblique",
    "orientative",
    "ornative",
    "partitive",
    "pegative",
    "perlative",
    "pertingent",
    "possessed",
    "possessive",
    "postessive",
    "prepositional",
    "privative",
    "prolative",
    "revertive",
    "semblative",
    "sociative",
    "subessive",
    "sublative",
    "superssive",
    "temporal",
    "terminative",
    "translative",
    "vocative",
] as const

/** List of all supported grammatical cases */
export const CASES: Case[] = _CASES as unknown as Case[]
