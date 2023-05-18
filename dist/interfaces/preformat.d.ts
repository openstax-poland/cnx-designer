import { Element } from 'slate';
/** Block of pre-formatted text */
export interface Preformat extends Element {
    type: 'preformat';
}
export declare const Preformat: {
    /** Check if value of unknown type is a pre-formatted block */
    isPreformat(value: unknown): value is Preformat;
};
