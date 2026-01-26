/** @jsx h */

import { CnxEditor, Transforms } from '../../../src'

export default (editor: CnxEditor) => Transforms.insertProof(editor, { select: true })

export const input = <editor>
    <rule>
        <statement>
            <p><cursor/>Statement</p>
        </statement>
        <ruleexample>
            <p>Example</p>
        </ruleexample>
    </rule>
</editor>

export const output = <editor>
    <rule>
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
