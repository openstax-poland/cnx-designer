// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { Element } from 'slate';
export const Code = {
    /** Check if value of unknown type is a piece of code */
    isCode(value) {
        return Element.isElement(value) && value.type === 'code';
    },
    /** Check if value of unknown type is a block of code */
    isCodeBlock(value) {
        return Code.isCode(value) && value.placement === 'block';
    },
    /** Check if value of unknown type is a line of code */
    isCodeLine(value) {
        return Code.isCode(value) && value.placement === 'line';
    },
};
