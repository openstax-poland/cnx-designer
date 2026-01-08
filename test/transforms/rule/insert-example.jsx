/** @jsx h */

import { Transforms } from '../../../src'

export default editor => Transforms.insertRuleExample(editor, { select: true })

export const input = <editor>
    <rule type="rule">
        <statement>
            <p><cursor/>Statement</p>
        </statement>
    </rule>
</editor>

export const output = <editor>
    <rule type="rule">
        <statement>
            <p>Statement</p>
        </statement>
        <ruleexample>
            <p><cursor/></p>
        </ruleexample>
    </rule>
</editor>
