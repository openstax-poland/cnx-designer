import { Descendant, Node } from 'slate';
/** A theorem, an axiom, a lemma, etc. */
export interface Rule {
    type: 'rule';
    /** What kind of rule is this */
    kind: RuleKind;
    children: Descendant[];
}
export type RuleKind = 'rule' | 'theorem' | 'lemma' | 'corollary' | 'law' | 'proposition';
export declare const RULE_KINDS: RuleKind[];
export declare const Rule: {
    /** Check if value of unknown type is a rule */
    isRule(this: void, value: Node | undefined | null): value is Rule;
    /** Check if value of unknown type is a kind of rule */
    isRuleKind(this: void, value: string): value is RuleKind;
};
/** Statement of a rule */
export interface Statement {
    type: 'rule_statement';
    children: Descendant[];
}
export declare const Statement: {
    /** Check if value of unknown type is a statement of a rule */
    isStatement(this: void, value: Node | undefined | null): value is Statement;
};
/** Proof or explanation of a rule */
export interface Proof {
    type: 'rule_proof';
    children: Descendant[];
}
export declare const Proof: {
    /** Check if value of unknown type is a proof of a rule */
    isProof(this: void, value: Node | undefined | null): value is Proof;
};
/** Example usage of a rule */
export interface RuleExample {
    type: 'rule_example';
    children: Descendant[];
}
export declare const RuleExample: {
    /** Check if value of unknown type is an example usage of a rule */
    isRuleExample(this: void, value: Node | undefined | null): value is RuleExample;
};
