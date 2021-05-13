import { Element } from 'slate';
/**
 * Different ‘types’ of admonitions
 *
 * This enumeration includes admonition types supported by both CNXML's <note>
 * and HTMLBook. Missing are `aside` from CNXML and `caution` from HTMLBook.
 */
export declare type AdmonitionKind = "note" | "warning" | "tip" | "important";
export declare const ADMONITION_KINDS: AdmonitionKind[];
/**
 * Admonitions are portions of text set off from the main text
 *
 * The term has been taken from DocBook.
 */
export interface Admonition extends Element {
    type: 'admonition';
    /** What kind of admonition is this */
    kind: AdmonitionKind;
}
export declare const Admonition: {
    /** Check if value of unknown type is an admonition */
    isAdmonition(value: unknown): value is Admonition;
    /** Check if value of unknown type is an admonition kind */
    isAdmonitionKind(value: string): value is AdmonitionKind;
};
