// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Element } from 'slate'

/** A theorem, an axiom, a lemma, etc. */
export interface Rule extends Element {
    type: 'rule'
    /** What kind of rule is this */
    kind: RuleKind
}

export type RuleKind =
    'rule' | 'theorem' | 'lemma' | 'corollary' | 'law' | 'proposition'

export const RULE_KINDS: RuleKind[]
    = ['rule', 'theorem', 'lemma', 'corollary', 'law', 'proposition']

export const Rule = {
    /** Check if value of unknown type is a rule */
    isRule(value: unknown): value is Rule {
        return Element.isElement(value) && value.type === 'rule'
    },

    /** Check if value of unknown type is a kind of rule */
    isRuleKind(value: string): value is RuleKind {
        return (RULE_KINDS as string[]).includes(value)
    },
}

/** Statement of a rule */
export interface Statement extends Element {
    type: 'rule_statement'
}

export const Statement = {
    /** Check if value of unknown type is a statement of a rule */
    isStatement(value: unknown): value is Statement {
        return Element.isElement(value) && value.type === 'rule_statement'
    },
}

/** Proof or explanation of a rule */
export interface Proof extends Element {
    type: 'rule_proof'
}

export const Proof = {
    /** Check if value of unknown type is a proof of a rule */
    isProof(value: unknown): value is Proof {
        return Element.isElement(value) && value.type === 'rule_proof'
    },
}

/** Example usage of a rule */
export interface RuleExample extends Element {
    type: 'rule_example'
}

export const RuleExample = {
    /** Check if value of unknown type is an example usage of a rule */
    isRuleExample(value: unknown): value is RuleExample {
        return Element.isElement(value) && value.type === 'rule_example'
    },
}
