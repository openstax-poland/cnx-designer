import { Element } from 'slate';
/** A subdivision of a document */
export interface Section extends Element {
    type: 'section';
}
export declare const Section: {
    /** Check if value of unknown type is a section */
    isSection(this: void, value: unknown): value is Section;
};
