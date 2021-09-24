import { Element } from 'slate';
/** Reference to a named element in this or another document. */
export interface CrossReference extends Element {
    type: 'xref';
    /** Identifier of the target element. */
    target: string;
    /**
     * Identifier of the document in which target is located.
     *
     * A null value indicates that the target is in this document.
     */
    document: string | null;
    /** Grammatical case in which the reference should be rendered */
    case?: Case;
}
export declare const CrossReference: {
    /** Check if value of unknown type is a cross-reference */
    isCrossReference(value: unknown): value is CrossReference;
    /** Check if value of unknown type is a valid grammatical case */
    isCase(value: unknown): value is "abessive" | "ablative" | "absolutive" | "accusative" | "adessive" | "adverbial" | "agentive" | "allative" | "antessive" | "apudessive" | "aversive" | "benefactive" | "causal" | "causal-final" | "comitative" | "comparative" | "dative" | "delative" | "distributive" | "egressive" | "elative" | "equative" | "ergative" | "ergative-genitive" | "essive" | "essive-formal" | "essive-modal" | "exessive" | "formal" | "genitive" | "identical" | "illative" | "inessive" | "initiative" | "instructive" | "instrumental" | "instrumental-comitative" | "intransitive" | "intrative" | "lative" | "locative" | "nominative" | "objective" | "oblique" | "orientative" | "ornative" | "partitive" | "pegative" | "perlative" | "pertingent" | "possessed" | "possessive" | "postessive" | "prepositional" | "privative" | "prolative" | "revertive" | "semblative" | "sociative" | "subessive" | "sublative" | "superssive" | "temporal" | "terminative" | "translative" | "vocative";
};
/** Reference to another document */
export interface DocumentReference extends Element {
    type: 'docref';
    /** Identifier of the target document */
    document: string;
}
export declare const DocumentReference: {
    /** Check if value of unknown type is a reference to another document */
    isDocumentReference(value: unknown): value is DocumentReference;
};
/** A hyperlink */
export interface Link extends Element {
    type: 'link';
    url: string;
}
export declare const Link: {
    /** Check if value of unknown type is a hyperlink */
    isLink(value: unknown): value is Link;
};
/** Grammatical case in which the reference should be rendered */
export declare type Case = typeof _CASES[number];
declare const _CASES: readonly ["abessive", "ablative", "ablative", "absolutive", "accusative", "accusative", "adessive", "adverbial", "agentive", "allative", "antessive", "apudessive", "aversive", "benefactive", "causal", "causal-final", "comitative", "comparative", "dative", "delative", "distributive", "egressive", "elative", "equative", "ergative", "ergative-genitive", "essive", "essive", "essive-formal", "essive-modal", "exessive", "formal", "genitive", "identical", "illative", "inessive", "initiative", "instructive", "instrumental", "instrumental-comitative", "intransitive", "intrative", "lative", "locative", "nominative", "objective", "oblique", "orientative", "ornative", "partitive", "pegative", "perlative", "pertingent", "possessed", "possessive", "postessive", "prepositional", "privative", "prolative", "revertive", "semblative", "sociative", "subessive", "sublative", "superssive", "temporal", "terminative", "translative", "vocative"];
/** List of all supported grammatical cases */
export declare const CASES: Case[];
export {};
