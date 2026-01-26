/** @jsx h */

import { CnxEditor, Transforms } from '../../../src'

export default (editor: CnxEditor) => Transforms.insertRuleExample(editor, { select: true })

export const input = <editor>
    <rule>
        <statement>
            <p>Statement</p>
        </statement>
        <ruleexample>
            <p>Ex<cursor/>ample</p>
        </ruleexample>
    </rule>
</editor>

export const output = <editor>
    <rule>
        <statement>
            <p>Statement</p>
        </statement>
        <ruleexample>
            <p>Example</p>
        </ruleexample>
        <ruleexample>
            <p><cursor/></p>
        </ruleexample>
    </rule>
</editor>
