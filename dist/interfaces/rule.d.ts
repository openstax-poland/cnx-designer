import { Element } from 'slate';
/** A theorem, an axiom, a lemma, etc. */
export interface Rule extends Element {
    type: 'rule';
    /** What kind of rule is this */
    kind: RuleKind;
}
export declare type RuleKind = 'rule' | 'theorem' | 'lemma' | 'corollary' | 'law' | 'proposition';
export declare const RULE_KINDS: RuleKind[];
export declare const Rule: {
    /** Check if value of unknown type is a rule */
    isRule(value: unknown): value is Rule;
    /** Check if value of unknown type is a kind of rule */
    isRuleKind(value: string): value is RuleKind;
};
/** Statement of a rule */
export interface Statement extends Element {
    type: 'rule_statement';
}
export declare const Statement: {
    /** Check if value of unknown type is a statement of a rule */
    isStatement(value: unknown): value is Statement;
};
/** Proof or explanation of a rule */
export interface Proof extends Element {
    type: 'rule_proof';
}
export declare const Proof: {
    /** Check if value of unknown type is a proof of a rule */
    isProof(value: unknown): value is Proof;
};
/** Example usage of a rule */
export interface RuleExample extends Element {
    type: 'rule_example';
}
export declare const RuleExample: {
    /** Check if value of unknown type is an example usage of a rule */
    isRuleExample(value: unknown): value is RuleExample;
};
