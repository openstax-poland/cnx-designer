import { Ancestor, Editor, Location, Node, NodeEntry } from 'slate';
export type NodeMatch<T extends Node> = ((node: Node) => node is T) | ((node: Node) => boolean);
/**
 * Find the first block above a location
 *
 * When mode is {@code lowest}, will return a match only if it doesn't contain
 * blocks.
 *
 * Unlike {@code Editor.above} this function doesn't ignore any nodes.
 */
export declare function blockAbove<T extends Ancestor>(editor: Editor, options?: {
    at?: Location;
    match?: NodeMatch<T>;
    mode?: 'any' | 'lowest';
}): NodeEntry<T> | undefined;
