import { Editor, Location } from 'slate';
/** Increase depth of a section */
export declare function increaseSectionDepth(editor: Editor, options?: {
    at?: Location;
}): void;
/** Decrease depth of a section */
export declare function decreaseSectionDepth(editor: Editor, options?: {
    at?: Location;
}): void;
