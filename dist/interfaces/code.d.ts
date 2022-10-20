import { Element } from 'slate';
/** A code fragment */
export interface Code extends Element {
    type: 'code';
    /** How this fragment is placed in the document */
    placement: 'block' | 'line';
    /** Programming language of the code in this fragment */
    language?: string;
}
/** A multi-line code fragment placed as a standalone block element */
export interface CodeBlock extends Code {
    placement: 'block';
}
/** A single-line code fragment placed alongside other line elements */
export interface CodeLine extends Code {
    placement: 'line';
}
export declare const Code: {
    /** Check if value of unknown type is a piece of code */
    isCode(value: unknown): value is Code;
    /** Check if value of unknown type is a block of code */
    isCodeBlock(value: unknown): value is CodeBlock;
    /** Check if value of unknown type is a line of code */
    isCodeLine(value: unknown): value is CodeLine;
};
