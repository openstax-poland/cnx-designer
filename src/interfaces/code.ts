// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Descendant, Node } from 'slate'

/** A code fragment */
export interface Code {
    type: 'code'
    /** How this fragment is placed in the document */
    placement: 'block' | 'line'
    /** Programming language of the code in this fragment */
    language?: string
    children: Descendant[]
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
    isCode(this: void, value: Node | undefined | null): value is Code {
        return value != null && Node.isElement(value) && value.type === 'code'
    },

    /** Check if value of unknown type is a block of code */
    isCodeBlock(this: void, value: Node | undefined | null): value is CodeBlock {
        return Code.isCode(value) && value.placement === 'block'
    },

    /** Check if value of unknown type is a line of code */
    isCodeLine(this: void, value: Node | undefined | null): value is CodeLine {
        return Code.isCode(value) && value.placement === 'line'
    },
}
