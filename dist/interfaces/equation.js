// Copyright 2021 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { Element } from 'slate';
export const Equation = {
    isEquation(value) {
        return Element.isElement(value) && value.type === 'equation';
    },
};
