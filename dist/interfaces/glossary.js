// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { Element } from 'slate';
export const Glossary = {
    /** Check if value of unknown type is a glossary */
    isGlossary(value) {
        return Element.isElement(value) && value.type === 'glossary';
    },
};
export const Term = {
    /** Check if value of unknown type is a term */
    isTerm(value) {
        return Element.isElement(value) && value.type === 'term';
    },
    isNameTerm(value) {
        return Term.isTerm(value) && value.index === 'name';
    },
};
export const Definition = {
    /** Check if value of unknown type is a definition */
    isDefinition(value) {
        return Element.isElement(value) && value.type === 'definition';
    },
};
export const DefinitionTerm = {
    /** Check if value of unknown type is a term of a definition */
    isDefinitionTerm(value) {
        return Element.isElement(value) && value.type === 'definition_term';
    },
};
export const Meaning = {
    /** Check if value of unknown type is a meaning of a definition */
    isMeaning(value) {
        return Element.isElement(value) && value.type === 'definition_meaning';
    },
};
export const DefinitionExample = {
    /** Check if value of unknown type is an example usage of a definition */
    isDefinitionExample(value) {
        return Element.isElement(value) && value.type === 'definition_example';
    },
};
export const SeeAlso = {
    /**
     * Check if value of unknown type is a reference to other related
     * definitions
     */
    isSeeAlso(value) {
        return Element.isElement(value) && value.type === 'definition_seealso';
    },
};
