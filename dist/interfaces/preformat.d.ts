import { Descendant, Node } from 'slate';
/** Block of pre-formatted text */
export interface Preformat {
    type: 'preformat';
    children: Descendant[];
}
export declare const Preformat: {
    /** Check if value of unknown type is a pre-formatted block */
    isPreformat(this: void, value: Node | undefined | null): value is Preformat;
};
