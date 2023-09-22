import * as Slate from 'slate';
import { Editor, Path } from 'slate';
import { Document as Doc } from '.';
/**
 * Editor used for deserialization
 *
 * This interface extends Slate's editor with various methods used for
 * deserialization. Those methods (as well as those of Editor) can be
 * overwritten to customize how a document is deserialized.
 */
export interface DeserializingEditor extends Editor {
    errors: DeserializingError[];
    /**
     * Deserialize an element
     *
     * This function is passed the element to deserialize, path at which nodes
     * it deserializes to should be inserted, and a context defining what
     * elements were expected at this place in the document.
     */
    deserializeElement(el: Element, at: Path, context: Deserializers): void;
    /**
     * Handle unknown element
     *
     * This function is called by {@link #deserializeElement} for elements which
     * are either unknown or unexpected at a given place in document.
     */
    unknownElement(el: Element, at: Path, context: Deserializers): void;
    /**
     * Report a deserialization problem
     *
     * `type` is a code describing the error and should only contain letters and
     * hyphens. `description` contains additional information which may be used
     * to format a user message.
     */
    reportError(type: string, description?: {
        [key: string]: unknown;
    }): void;
    /** Finalize deserialization */
    finalize(): Doc;
}
export interface DeserializingError {
    type: string;
    [key: string]: unknown;
}
/**
 * Deserialize a CNXML document from xml or a DOM tree
 *
 * The provided editor will be used for deserialization and will be modified.
 * After deserialization is complete, the editor will contain the same content
 * as the returned {@link Doc} element.
 */
export default function deserialize(withEditor: (editor: DeserializingEditor) => DeserializingEditor, xml: string | Document): Doc;
export declare type Deserializer = (editor: DeserializingEditor, el: Element, at: Path) => void;
export declare type Deserializers = {
    [localName: string]: Deserializer;
};
/**
 * Deserialize children of an element
 *
 * This function will deserialize all child nodes of el, each into a separate
 * Slate node. This means that every XML text node will produce a Slate text
 * node, and all formatting white space will be treated as content, even for
 * block elements. This should later be fixed using {@link normalizeBlock} or
 * {@link normalizeLine}.
 */
export declare function children(editor: DeserializingEditor, el: Element, at: Path, context: Deserializers): void;
/**
 * Build an element according to a template and insert it at a path
 *
 * The template will be extended with additional properties common to all CNXML
 * elements.
 *
 * Element's children will be deserialized using {@link children}.
 */
export declare function buildElement(editor: DeserializingEditor, el: Element, at: Path, template: Partial<Slate.Element>, context: Deserializers): void;
/**
 * Normalize a block element after deserialization.
 *
 * All inter-element white space will be removed, and non-white space text will
 * be converted into paragraphs.
 */
export declare function normalizeBlock(editor: DeserializingEditor, at: Path): void;
/**
 * Normalize a line element after deserialization
 *
 * White space will be normalized (and trailing removed), and block children
 * will be unwrapped, splitting this element if necessary.
 */
export declare function normalizeLine(editor: Editor, at: Path): void;
/** Normalize element which shouldn't contain any children */
export declare function normalizeVoid(editor: DeserializingEditor, at: Path): void;
/** Inline elements */
export declare const INLINE: Deserializers;
/** Line elements */
export declare const LINE: Deserializers;
/** Block elements */
export declare const BLOCK: Deserializers;
