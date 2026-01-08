/** @jsx h */

import { Transforms } from '../../../src'

export default editor => Transforms.insertProof(editor)

export const input = <editor>
    <rule type="rule">
        <statement>
            <p>Statement</p>
        </statement>
        <proof>
            <p>Proof</p>
        </proof>
        <ruleexample>
            <p><cursor/>Example</p>
        </ruleexample>
    </rule>
</editor>

export const output = <editor>
    <rule type="rule">
        <statement>
            <p>Statement</p>
        </statement>
        <proof>
            <p>Proof</p>
        </proof>
        <proof>
            <p><text/></p>
        </proof>
        <ruleexample>
            <p><cursor/>Example</p>
        </ruleexample>
    </rule>
</editor>
