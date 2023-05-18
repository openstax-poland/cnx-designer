import { Editor } from 'slate';
export interface IdEditor extends Editor {
    generateID: () => string;
}
/**
 * Augment an editor with an ID manager
 *
 * The ID manager will ensure that each {@link Element} has a document-unique
 * property {@code id: string}.
 */
export declare function withIds<T extends Editor>(editor: T): T & IdEditor;
