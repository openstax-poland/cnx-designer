// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Element, Text } from 'slate'

/** How a fragment of text is placed */
export type TextPosition = 'normal' | 'superscript' | 'subscript'

/** A {@link Text} node with styles applied */
export interface StyledText extends Text {
    /** If true, this text has weak emphasis placed on it */
    emphasis?: boolean
    /** If true, this text has strong emphasis placed on it */
    strong?: boolean
    /** How this text is placed. The default value is 'normal' */
    position?: TextPosition
}

/** A single paragraph of text */
export interface Paragraph extends Element {
    type: 'paragraph'
}

export const Paragraph = {
    /** Check if value of unknown type is a paragraph */
    isParagraph(this: void, value: unknown): value is Paragraph {
        return Element.isElement(value) && value.type === 'paragraph'
    },
}

/** Caption of a figure or another element which can have captions */
export interface Caption extends Element {
    type: 'caption'
}

export const Caption = {
    /** Check if value of unknown type is a caption */
    isCaption(this: void, value: unknown): value is Caption {
        return Element.isElement(value) && value.type === 'caption'
    },
}

/** A quotation */
export interface Quotation extends Element {
    type: 'quotation'
}

export const Quotation = {
    /** Check if value of unknown type is a quotation */
    isQuotation(this: void, value: unknown): value is Quotation {
        return Element.isElement(value) && value.type === 'quotation'
    },
}

/** A title of a section or another structural element */
export interface Title extends Element {
    type: 'title'
}

export const Title = {
    /** Check if value of unknown type is a title */
    isTitle(this: void, value: unknown): value is Title {
        return Element.isElement(value) && value.type === 'title'
    },
}

/** A fragment of text in another language */
export interface Foreign extends Element {
    type: 'foreign'
    language?: string
}

export const Foreign = {
    /** Check if value of unknown type is a foreign text */
    isForeign(this: void, value: unknown): value is Foreign {
        return Element.isElement(value) && value.type === 'foreign'
    },
}

/** A footnote */
export interface Footnote extends Element {
    type: 'footnote'
}

export const Footnote = {
    /** Check if value of unknown type is a footnote */
    isFootnote(this: void, value: unknown): value is Footnote {
        return Element.isElement(value) && value.type === 'footnote'
    },
}
