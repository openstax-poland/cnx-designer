import { Editor, Element, Node, NodeEntry, Path } from 'slate';
declare type NodeMatch<T extends Node> = ((node: Node) => node is T) | ((node: Node) => boolean);
/**
 * Find children which are out of order and move them to correct places
 *
 * Return true if entry was normalized and false otherwise.
 */
export declare function normalizeOrderedChildren<T extends Element>(editor: Editor, entry: NodeEntry<T>, groups: NodeMatch<Node>[], normalize: (editor: Editor, entry: NodeEntry, parent: T) => void): boolean;
/**
 * Find a previous sibling of node matching specified criteria, and stepping
 * only over siblings matching other criteria.
 */
export declare function previousOverOnly<T extends Node>(editor: Editor, options: {
    at: Path;
    match: NodeMatch<T>;
    over: NodeMatch<Node>;
}): NodeEntry<T> | undefined;
export {};
