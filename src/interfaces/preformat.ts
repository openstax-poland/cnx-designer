// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Element } from 'slate'

/** Block of pre-formatted text */
export interface Preformat extends Element {
    type: 'preformat'
}

export const Preformat = {
    /** Check if value of unknown type is a pre-formatted block */
    isPreformat(this: void, value: unknown): value is Preformat {
        return Element.isElement(value) && value.type === 'preformat'
    },
}
