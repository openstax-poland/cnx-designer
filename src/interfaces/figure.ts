// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Element } from 'slate'

/** A figure */
export interface Figure extends Element {
    type: 'figure'
}

export const Figure = {
    /** Check if value of unknown type is a figure */
    isFigure(value: unknown): value is Figure {
        return Element.isElement(value) && value.type === 'figure'
    },
}
