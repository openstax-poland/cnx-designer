/** @jsx h */

import { Transforms } from '../../..'

export default editor => Transforms.insertStatement(editor, { select: true })

export const input = <editor>
    <rule type="rule">
        <statement>
            <p><cursor/>Statement</p>
        </statement>
        <proof>
            <p>Proof</p>
        </proof>
    </rule>
</editor>

export const output = <editor>
    <rule type="rule">
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
