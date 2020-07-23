/** @jsx h */

import { Transforms } from '../../../src'

export default editor => Transforms.insertDefinitionExample(editor, { select: true })

export const input = <editor>
    <definition>
        <defterm>Term</defterm>
        <defmeaning>
            <p>Meaning<cursor/></p>
        </defmeaning>
        <defmeaning>
            <p>Meaning 2</p>
        </defmeaning>
    </definition>
</editor>

export const output = <editor>
    <definition>
        <defterm>Term</defterm>
        <defmeaning>
            <p>Meaning</p>
        </defmeaning>
        <defexample>
            <p><cursor/></p>
        </defexample>
        <defmeaning>
            <p>Meaning 2</p>
        </defmeaning>
    </definition>
</editor>
