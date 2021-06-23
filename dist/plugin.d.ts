import { Editor } from 'slate';
/** A Slate editor augmented with support for editing CNX documents. */
export interface CnxEditor extends Editor {
}
/**
 * Augment an editor with functionalities and behaviours necessary for editing
 * CNX documents.
 */
export declare function withCnx<T extends Editor>(editor: T): T & CnxEditor;
