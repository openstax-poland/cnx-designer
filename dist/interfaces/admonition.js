// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { Element } from 'slate';
export const ADMONITION_KINDS = ["note", "warning", "tip", "important"];
export const Admonition = {
    /** Check if value of unknown type is an admonition */
    isAdmonition(value) {
        return Element.isElement(value) && value.type === 'admonition';
    },
    /** Check if value of unknown type is an admonition kind */
    isAdmonitionKind(value) {
        return ADMONITION_KINDS.includes(value);
    },
};
// declare module 'slate' {
//     interface CustomTypes {
//         Element: Admonition
//     }
// }
