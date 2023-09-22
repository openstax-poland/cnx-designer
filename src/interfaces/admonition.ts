// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Element } from 'slate'

/**
 * Different ‘types’ of admonitions
 *
 * This enumeration includes admonition types supported by both CNXML's <note>
 * and HTMLBook. Missing are `aside` from CNXML and `caution` from HTMLBook.
 */
export type AdmonitionKind = "note" | "warning" | "tip" | "important"

export const ADMONITION_KINDS: AdmonitionKind[] = ["note", "warning", "tip", "important"]

/**
 * Admonitions are portions of text set off from the main text
 *
 * The term has been taken from DocBook.
 */
export interface Admonition extends Element {
    type: 'admonition'
    /** What kind of admonition is this */
    kind: AdmonitionKind
}

export const Admonition = {
    /** Check if value of unknown type is an admonition */
    isAdmonition(this: void, value: unknown): value is Admonition {
        return Element.isElement(value) && value.type === 'admonition'
    },

    /** Check if value of unknown type is an admonition kind */
    isAdmonitionKind(this: void, value: string): value is AdmonitionKind {
        return (ADMONITION_KINDS as string[]).includes(value)
    },
}
