/** @jsx h */

import { Transforms } from '../../..'

export default editor => Transforms.insertProof(editor, { select: true })

export const input = <editor>
    <rule type="rule">
        <statement>
            <p><cursor/>Statement</p>
        </statement>
        <ruleexample>
            <p>Example</p>
        </ruleexample>
    </rule>
</editor>

export const output = <editor>
    <rule type="rule">
        <statement>
            <p>Statement</p>
        </statement>
        <proof>
            <p><cursor/></p>
        </proof>
        <ruleexample>
            <p>Example</p>
        </ruleexample>
    </rule>
</editor>
