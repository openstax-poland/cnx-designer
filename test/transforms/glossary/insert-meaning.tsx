/** @jsx h */

import { CnxEditor, Transforms } from '../../../src'

export default (editor: CnxEditor) => Transforms.insertMeaning(editor, { select: true })

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
        <defmeaning>
            <p><cursor/></p>
        </defmeaning>
    </definition>
</editor>
