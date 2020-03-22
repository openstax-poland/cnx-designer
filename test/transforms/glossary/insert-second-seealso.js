/** @jsx h */

import { Transforms } from '../../..'

export default editor => Transforms.insertSeeAlso(editor, { select: true })

export const input = <editor>
    <definition>
        <defterm>Term</defterm>
        <defmeaning>
            <p>Meaning<cursor/></p>
        </defmeaning>
        <defseealso>
            <defterm>Term<cursor/></defterm>
        </defseealso>
    </definition>
</editor>

export const output = <editor>
    <definition>
        <defterm>Term</defterm>
        <defmeaning>
            <p>Meaning</p>
        </defmeaning>
        <defseealso>
            <defterm>Term</defterm>
            <defterm><cursor/></defterm>
        </defseealso>
    </definition>
</editor>
