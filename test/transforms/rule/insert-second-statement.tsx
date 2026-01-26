/** @jsx h */

import { CnxEditor, Transforms } from '../../../src'

export default (editor: CnxEditor) => Transforms.insertStatement(editor, { select: true })

export const input = <editor>
    <rule>
        <statement>
            <p><cursor/>Statement</p>
        </statement>
        <proof>
            <p>Proof</p>
        </proof>
    </rule>
</editor>

export const output = <editor>
    <rule>
        <statement>
            <p>Statement</p>
        </statement>
        <statement>
            <p><cursor/></p>
        </statement>
        <proof>
            <p>Proof</p>
        </proof>
    </rule>
</editor>
