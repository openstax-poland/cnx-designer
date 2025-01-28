import { Element } from 'slate';
/** List of definitions of terms, used alongside contents of a document */
export interface Glossary extends Element {
    type: 'glossary';
}
export declare const Glossary: {
    /** Check if value of unknown type is a glossary */
    isGlossary(this: void, value: unknown): value is Glossary;
};
/**
 * A term
 *
 * This element can be used as an inline in text to mark it as a term, for
 * inclusion in an index or formatting. It can also be used as a key of
 * a {@link Definition}.
 */
export interface Term extends Element {
    type: 'term';
    index?: string;
    reference?: string;
}
/**
 * A term that goes into name index
 */
export interface NameTerm extends Term {
    index: 'name';
    name?: string;
    born?: number;
    died?: number;
}
export declare const Term: {
    /** Check if value of unknown type is a term */
    isTerm(this: void, value: unknown): value is Term;
    isNameTerm(this: void, value: unknown): value is NameTerm;
};
/**
 * Definition of a term
 *
 * Definitions can be used either in the document content, or as entries in the
 * glossary.
 */
export interface Definition extends Element {
    type: 'definition';
}
export declare const Definition: {
    /** Check if value of unknown type is a definition */
    isDefinition(this: void, value: unknown): value is Definition;
};
/**
 * Term which is defined by a {@link Definition}
 *
 * This interface is the same as {@link Term} except that it is a block element
 * meant to be used as a child of {@link Definition}.
 */
export interface DefinitionTerm extends Element {
    type: 'definition_term';
    reference?: string;
}
export declare const DefinitionTerm: {
    /** Check if value of unknown type is a term of a definition */
    isDefinitionTerm(this: void, value: unknown): value is DefinitionTerm;
};
/** Meaning of a term */
export interface Meaning extends Element {
    type: 'definition_meaning';
}
export declare const Meaning: {
    /** Check if value of unknown type is a meaning of a definition */
    isMeaning(this: void, value: unknown): value is Meaning;
};
/** Example usage of a term. */
export interface DefinitionExample extends Element {
    type: 'definition_example';
}
export declare const DefinitionExample: {
    /** Check if value of unknown type is an example usage of a definition */
    isDefinitionExample(this: void, value: unknown): value is DefinitionExample;
};
/** Reference to other related terms */
export interface SeeAlso extends Element {
    type: 'definition_seealso';
}
export declare const SeeAlso: {
    /**
     * Check if value of unknown type is a reference to other related
     * definitions
     */
    isSeeAlso(this: void, value: unknown): value is SeeAlso;
};
