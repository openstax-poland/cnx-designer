// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { Element } from 'slate';
export const RULE_KINDS = ['rule', 'theorem', 'lemma', 'corollary', 'law', 'proposition'];
export const Rule = {
    /** Check if value of unknown type is a rule */
    isRule(value) {
        return Element.isElement(value) && value.type === 'rule';
    },
    /** Check if value of unknown type is a kind of rule */
    isRuleKind(value) {
        return RULE_KINDS.includes(value);
    },
};
export const Statement = {
    /** Check if value of unknown type is a statement of a rule */
    isStatement(value) {
        return Element.isElement(value) && value.type === 'rule_statement';
    },
};
export const Proof = {
    /** Check if value of unknown type is a proof of a rule */
    isProof(value) {
        return Element.isElement(value) && value.type === 'rule_proof';
    },
};
export const RuleExample = {
    /** Check if value of unknown type is an example usage of a rule */
    isRuleExample(value) {
        return Element.isElement(value) && value.type === 'rule_example';
    },
};
