/** @jsx h */

import { Editor, Transforms } from 'slate'

import { RuleExample } from '../../../src'
import { Simulator } from '../../util/input'

export default (input: Simulator, editor: Editor) => {
    input.break().break()
    const [[, path]] = Editor.nodes(
        editor, { match: RuleExample.isRuleExample, reverse: true })
    Transforms.select(editor, Editor.end(editor, path))
    input.break().break().break()
}

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
            <p>Ex</p>
        </ruleexample>
        <ruleexample>
            <p>ample</p>
        </ruleexample>
    </rule>
    <p><cursor/></p>
</editor>
