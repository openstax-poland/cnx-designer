import { Descendant, Node } from 'slate';
/** A subdivision of a document */
export interface Section {
    type: 'section';
    children: Descendant[];
}
export declare const Section: {
    /** Check if value of unknown type is a section */
    isSection(this: void, value: Node | undefined | null): value is Section;
};
