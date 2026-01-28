/** @jsx h */

import { RuleKind } from '../../../src'

export const input = <editor>
    <element type="rule" kind={"invalid" as RuleKind}>
        <statement>
            <p><cursor/>Text</p>
        </statement>
    </element>
</editor>

export const output = <editor>
    <rule>
        <statement>
            <p><cursor/>Text</p>
        </statement>
    </rule>
</editor>
