// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { Element } from 'slate';
export const CrossReference = {
    /** Check if value of unknown type is a cross-reference */
    isCrossReference(value) {
        return Element.isElement(value) && value.type === 'xref';
    },
    /** Check if value of unknown type is a valid grammatical case */
    isCase(value) {
        return CASES.includes(value);
    },
};
export const DocumentReference = {
    /** Check if value of unknown type is a reference to another document */
    isDocumentReference(value) {
        return Element.isElement(value) && value.type === 'docref';
    },
};
export const Link = {
    /** Check if value of unknown type is a hyperlink */
    isLink(value) {
        return Element.isElement(value) && value.type === 'link';
    },
};
const _CASES = [
    "abessive",
    "ablative",
    "ablative",
    "absolutive",
    "accusative",
    "accusative",
    "adessive",
    "adverbial",
    "agentive",
    "allative",
    "antessive",
    "apudessive",
    "aversive",
    "benefactive",
    "causal",
    "causal-final",
    "comitative",
    "comparative",
    "dative",
    "delative",
    "distributive",
    "egressive",
    "elative",
    "equative",
    "ergative",
    "ergative-genitive",
    "essive",
    "essive",
    "essive-formal",
    "essive-modal",
    "exessive",
    "formal",
    "genitive",
    "identical",
    "illative",
    "inessive",
    "initiative",
    "instructive",
    "instrumental",
    "instrumental-comitative",
    "intransitive",
    "intrative",
    "lative",
    "locative",
    "nominative",
    "objective",
    "oblique",
    "orientative",
    "ornative",
    "partitive",
    "pegative",
    "perlative",
    "pertingent",
    "possessed",
    "possessive",
    "postessive",
    "prepositional",
    "privative",
    "prolative",
    "revertive",
    "semblative",
    "sociative",
    "subessive",
    "sublative",
    "superssive",
    "temporal",
    "terminative",
    "translative",
    "vocative",
];
/** List of all supported grammatical cases */
export const CASES = _CASES;
