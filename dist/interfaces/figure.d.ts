import { Element } from 'slate';
/** A figure */
export interface Figure extends Element {
    type: 'figure';
}
export declare const Figure: {
    /** Check if value of unknown type is a figure */
    isFigure(this: void, value: unknown): value is Figure;
};
