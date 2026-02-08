import { Descendant, Editor, Element, NodeEntry, Path } from 'slate';
type DescendantMatch<T extends Descendant = Descendant> = ((node: Descendant) => node is T) | ((node: Descendant) => boolean);
/**
 * Find children which are out of order and move them to correct places
 *
 * Return true if entry was normalized and false otherwise.
 */
export declare function normalizeOrderedChildren<T extends Element>(editor: Editor, entry: NodeEntry<T>, groups: DescendantMatch[], normalize: (editor: Editor, entry: NodeEntry, parent: T) => void): boolean;
/**
 * Find a previous sibling of node matching specified criteria, and stepping
 * only over siblings matching other criteria.
 */
export declare function previousOverOnly<T extends Descendant>(editor: Editor, options: {
    at: Path;
    match: DescendantMatch<T>;
    over: DescendantMatch;
}): NodeEntry<T> | undefined;
export {};
