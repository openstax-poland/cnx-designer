import { Editor, Location } from 'slate';
/** Insert a new section title, wrapping it and following nodes in a section */
export declare function wrapSectionTitle(editor: Editor, options?: {
    at?: Location;
}): void;
/** Increase depth of a section */
export declare function increaseSectionDepth(editor: Editor, options?: {
    at?: Location;
}): void;
/** Decrease depth of a section */
export declare function decreaseSectionDepth(editor: Editor, options?: {
    at?: Location;
}): void;
