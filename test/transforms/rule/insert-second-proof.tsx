/** @jsx h */

import { CnxEditor, Transforms } from '../../../src'

export default (editor: CnxEditor) => Transforms.insertProof(editor)

export const input = <editor>
    <rule>
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
    <rule>
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
