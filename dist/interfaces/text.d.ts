import { Element, Text } from 'slate';
/** How a fragment of text is placed */
export type TextPosition = 'normal' | 'superscript' | 'subscript';
/** A {@link Text} node with styles applied */
export interface StyledText extends Text {
    /** If true, this text has weak emphasis placed on it */
    emphasis?: boolean;
    /** If true, this text has strong emphasis placed on it */
    strong?: boolean;
    /** How this text is placed. The default value is 'normal' */
    position?: TextPosition;
}
/** A single paragraph of text */
export interface Paragraph extends Element {
    type: 'paragraph';
}
export declare const Paragraph: {
    /** Check if value of unknown type is a paragraph */
    isParagraph(value: unknown): value is Paragraph;
};
/** Caption of a figure or another element which can have captions */
export interface Caption extends Element {
    type: 'caption';
}
export declare const Caption: {
    /** Check if value of unknown type is a caption */
    isCaption(value: unknown): value is Caption;
};
/** A quotation */
export interface Quotation extends Element {
    type: 'quotation';
}
export declare const Quotation: {
    /** Check if value of unknown type is a quotation */
    isQuotation(value: unknown): value is Quotation;
};
/** A title of a section or another structural element */
export interface Title extends Element {
    type: 'title';
}
export declare const Title: {
    /** Check if value of unknown type is a title */
    isTitle(value: unknown): value is Title;
};
/** A fragment of text in another language */
export interface Foreign extends Element {
    type: 'foreign';
    language?: string;
}
export declare const Foreign: {
    /** Check if value of unknown type is a foreign text */
    isForeign(value: unknown): value is Foreign;
};
/** A footnote */
export interface Footnote extends Element {
    type: 'footnote';
}
export declare const Footnote: {
    /** Check if value of unknown type is a footnote */
    isFootnote(value: unknown): value is Footnote;
};
