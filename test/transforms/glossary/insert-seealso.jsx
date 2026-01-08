/** @jsx h */

import { Transforms } from '../../../src'

export default editor => Transforms.insertSeeAlso(editor, { select: true })

export const input = <editor>
    <definition>
        <defterm>Term</defterm>
        <defmeaning>
            <p>Meaning<cursor/></p>
        </defmeaning>
    </definition>
</editor>

export const output = <editor>
    <definition>
        <defterm>Term</defterm>
        <defmeaning>
            <p>Meaning</p>
        </defmeaning>
        <defseealso>
            <defterm><cursor/></defterm>
        </defseealso>
    </definition>
</editor>
