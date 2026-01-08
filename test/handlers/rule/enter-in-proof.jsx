/** @jsx h */

import { Proof } from '../../../src'
import { Editor, Transforms } from 'slate'

export default (input, editor) => {
    input.break().break()
    const [[, path]] = Editor.nodes(editor, { match: Proof.isProof, reverse: true })
    Transforms.select(editor, Editor.end(editor, path))
    input.break().break().break()
}

export const input = <editor>
    <rule type="rule">
        <statement>
            <p>Statement</p>
        </statement>
        <proof>
            <p>Pro<cursor/>of</p>
        </proof>
    </rule>
</editor>

export const output = <editor>
    <rule type="rule">
        <statement>
            <p>Statement</p>
        </statement>
        <proof>
            <p>Pro</p>
        </proof>
        <proof>
            <p>of</p>
        </proof>
    </rule>
    <p><cursor/></p>
</editor>
