import { Node } from 'slate';
/** Deep clone a node */
export default function cloneNode<T extends Node>(node: T): T;
