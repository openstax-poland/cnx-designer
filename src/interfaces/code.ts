// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Element } from 'slate'

/** A code fragment */
export interface Code extends Element {
    type: 'code'
    /** How this fragment is placed in the document */
    placement: 'block' | 'line'
    /** Programming language of the code in this fragment */
    language?: string
}

/** A multi-line code fragment placed as a standalone block element */
export interface CodeBlock extends Code {
    placement: 'block'
}

/** A single-line code fragment placed alongside other line elements */
export interface CodeLine extends Code {
    placement: 'line'
}

export const Code = {
    /** Check if value of unknown type is a piece of code */
    isCode(this: void, value: unknown): value is Code {
        return Element.isElement(value) && value.type === 'code'
    },

    /** Check if value of unknown type is a block of code */
    isCodeBlock(this: void, value: unknown): value is CodeBlock {
        return Code.isCode(value) && value.placement === 'block'
    },

    /** Check if value of unknown type is a line of code */
    isCodeLine(this: void, value: unknown): value is CodeLine {
        return Code.isCode(value) && value.placement === 'line'
    },
}
