/** @jsx h */

import { CnxEditor, Transforms } from '../../../src'

export default (editor: CnxEditor) => Transforms.insertRuleExample(editor, { select: true })

export const input = <editor>
    <rule>
        <statement>
            <p><cursor/>Statement</p>
        </statement>
    </rule>
</editor>

export const output = <editor>
    <rule>
        <statement>
            <p>Statement</p>
        </statement>
        <ruleexample>
            <p><cursor/></p>
        </ruleexample>
    </rule>
</editor>
