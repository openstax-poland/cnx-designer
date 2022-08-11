// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { Element } from 'slate';
export const Paragraph = {
    /** Check if value of unknown type is a paragraph */
    isParagraph(value) {
        return Element.isElement(value) && value.type === 'paragraph';
    },
};
export const Caption = {
    /** Check if value of unknown type is a caption */
    isCaption(value) {
        return Element.isElement(value) && value.type === 'caption';
    },
};
export const Quotation = {
    /** Check if value of unknown type is a quotation */
    isQuotation(value) {
        return Element.isElement(value) && value.type === 'quotation';
    },
};
export const Title = {
    /** Check if value of unknown type is a title */
    isTitle(value) {
        return Element.isElement(value) && value.type === 'title';
    },
};
export const Foreign = {
    /** Check if value of unknown type is a foreign text */
    isForeign(value) {
        return Element.isElement(value) && value.type === 'foreign';
    },
};
export const Footnote = {
    /** Check if value of unknown type is a footnote */
    isFootnote(value) {
        return Element.isElement(value) && value.type === 'footnote';
    },
};
