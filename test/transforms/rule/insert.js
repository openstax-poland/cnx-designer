/** @jsx h */

import { Transforms } from '../../../src'

export default editor => Transforms.insertRule(editor)

export const input = <editor>
    <p><cursor/>Rule</p>
</editor>

export const output = <editor>
    <rule type="rule">
        <statement>
            <p><cursor/>Rule</p>
        </statement>
    </rule>
</editor>
