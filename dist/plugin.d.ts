import { Element } from 'slate';
import { ListEditor } from 'slate-lists';
/** A Slate editor augmented with support for editing CNX documents. */
export interface CnxEditor extends ListEditor {
    /** Can {@code element} be used as content of an {@link Equation}? */
    isEquationContent(element: Element): boolean;
}
/**
 * Augment an editor with functionalities and behaviours necessary for editing
 * CNX documents.
 */
export declare function withCnx<T extends ListEditor>(editor: T): T & CnxEditor;
