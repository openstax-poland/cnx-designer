// Copyright 2021 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Descendant, Element } from 'slate'

export interface Equation {
    type: 'equation'
    children: Descendant[]
}

export const Equation = {
    isEquation(this: void, value: unknown): value is Equation {
        return Element.isElement(value) && value.type === 'equation'
    },
}
