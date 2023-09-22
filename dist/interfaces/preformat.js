// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { Element } from 'slate';
export const Preformat = {
    /** Check if value of unknown type is a pre-formatted block */
    isPreformat(value) {
        return Element.isElement(value) && value.type === 'preformat';
    },
};