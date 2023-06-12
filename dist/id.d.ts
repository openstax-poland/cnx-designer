import { Editor } from 'slate';
export interface IdEditor extends Editor {
    generateID: () => string;
}
export declare const IdEditor: {
    /**
     * Invalidate ID cache
     *
     * This function must be called each time `editor.children` are manually
     * updated. It will invalidate the internal ID cache, ensuring it is rebuilt
     * the next time it is needed.
     */
    invalidateIDs(editor: IdEditor): void;
};
/**
 * Augment an editor with an ID manager
 *
 * The ID manager will ensure that each {@link Element} has a document-unique
 * property {@code id: string}.
 */
export declare function withIds<T extends Editor>(editor: T): T & IdEditor;
