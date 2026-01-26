/** @jsx h */

import { CnxEditor, Transforms } from '../../../src'

export default (editor: CnxEditor) => Transforms.insertRule(editor)

export const input = <editor>
    <p><cursor/>Rule</p>
</editor>

export const output = <editor>
    <rule>
        <statement>
            <p><cursor/>Rule</p>
        </statement>
    </rule>
</editor>
