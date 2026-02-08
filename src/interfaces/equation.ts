// Copyright 2021 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Descendant, Element, Node } from 'slate'

export interface Equation {
    type: 'equation'
    children: Descendant[]
}

export const Equation = {
    isEquation(this: void, value: Node | undefined | null): value is Equation {
        return value != null && Node.isElement(value) && value.type === 'equation'
    },
}
