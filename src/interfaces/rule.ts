// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Descendant, Node } from 'slate'

/** A theorem, an axiom, a lemma, etc. */
export interface Rule {
    type: 'rule'
    /** What kind of rule is this */
    kind: RuleKind
    children: Descendant[]
}

export type RuleKind =
    'rule' | 'theorem' | 'lemma' | 'corollary' | 'law' | 'proposition'

export const RULE_KINDS: RuleKind[] =
    ['rule', 'theorem', 'lemma', 'corollary', 'law', 'proposition']

export const Rule = {
    /** Check if value of unknown type is a rule */
    isRule(this: void, value: Node | undefined | null): value is Rule {
        return value != null && Node.isElement(value) && value.type === 'rule'
    },

    /** Check if value of unknown type is a kind of rule */
    isRuleKind(this: void, value: string): value is RuleKind {
        return (RULE_KINDS as string[]).includes(value)
    },
}

/** Statement of a rule */
export interface Statement {
    type: 'rule_statement'
    children: Descendant[]
}

export const Statement = {
    /** Check if value of unknown type is a statement of a rule */
    isStatement(this: void, value: Node | undefined | null): value is Statement {
        return value != null && Node.isElement(value) && value.type === 'rule_statement'
    },
}

/** Proof or explanation of a rule */
export interface Proof {
    type: 'rule_proof'
    children: Descendant[]
}

export const Proof = {
    /** Check if value of unknown type is a proof of a rule */
    isProof(this: void, value: Node | undefined | null): value is Proof {
        return value != null && Node.isElement(value) && value.type === 'rule_proof'
    },
}

/** Example usage of a rule */
export interface RuleExample {
    type: 'rule_example'
    children: Descendant[]
}

export const RuleExample = {
    /** Check if value of unknown type is an example usage of a rule */
    isRuleExample(this: void, value: Node | undefined | null): value is RuleExample {
        return value != null && Node.isElement(value) && value.type === 'rule_example'
    },
}
