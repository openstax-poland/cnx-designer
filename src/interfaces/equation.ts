// Copyright 2021 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Element } from 'slate'

export interface Equation extends Element {
    type: 'equation'
}

export const Equation = {
    isEquation(this: void, value: unknown): value is Equation {
        return Element.isElement(value) && value.type === 'equation'
    },
}
