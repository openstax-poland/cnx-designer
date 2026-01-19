// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Descendant, Element } from 'slate'

/** A subdivision of a document */
export interface Section {
    type: 'section'
    children: Descendant[]
}

export const Section = {
    /** Check if value of unknown type is a section */
    isSection(this: void, value: unknown): value is Section {
        return Element.isElement(value) && value.type === 'section'
    },
}
