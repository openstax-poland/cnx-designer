/** @jsx JSX.createElement */
import { MediaData } from 'cnx-designer';
import { Editor, Node } from 'slate';
import * as JSX from './jsx';
import { Document as Doc } from '.';
/** Serialization options */
export interface Options<Format> {
    /** Format to which to serialize */
    format: Format;
    /** Function used to determine the MIME type of a media item */
    mediaMime: MediaMimeFunction;
    /** Function used to serialize custom nodes */
    serializeNode?: PartialSerializer;
}
/** Function used to determine the MIME type of a media item */
export declare type MediaMimeFunction = (media: MediaData) => string;
/**
 * Function used to serialize custom nodes
 *
 * If provided, the serialization routine will first consult this function. If
 * a non-null value is returned it will be used as node's serialization.
 * Otherwise serialization will proceed as if this function wasn't provided.
 */
export declare type PartialSerializer = (node: Node, attrs: CommonAttrs, children: JSX.Node, ctx: Context) => JSX.Node;
export default function serialize(editor: Editor, document: Doc, options: Options<'xml'>): string;
export default function serialize(editor: Editor, document: Doc, options: Options<'dom'>): Document;
/** Serialization context */
export interface Context {
    mediaMime: MediaMimeFunction;
    serializeNode?: PartialSerializer;
}
/** Attributes common to all elements */
export interface CommonAttrs {
    /** Element's ID */
    id: string;
    /** CSS classes */
    class?: string;
}
