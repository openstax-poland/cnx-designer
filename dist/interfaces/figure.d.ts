import { Descendant, Node } from 'slate';
/** A figure */
export interface Figure {
    type: 'figure';
    children: Descendant[];
}
export declare const Figure: {
    /** Check if value of unknown type is a figure */
    isFigure(this: void, value: Node | undefined | null): value is Figure;
};
