// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Descendant, Element, Node } from 'slate'

/** Block of pre-formatted text */
export interface Preformat {
    type: 'preformat'
    children: Descendant[]
}

export const Preformat = {
    /** Check if value of unknown type is a pre-formatted block */
    isPreformat(this: void, value: Node | undefined | null): value is Preformat {
        return value != null && Node.isElement(value) && value.type === 'preformat'
    },
}
