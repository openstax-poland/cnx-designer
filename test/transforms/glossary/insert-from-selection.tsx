/** @jsx h */

import { CnxEditor, Transforms } from '../../../src'

export default (editor: CnxEditor) => Transforms.addGlossaryDefinition(editor, { select: true })

export const input = <editor>
    <p>Content <anchor/>another term<focus/> content</p>
    <glossary>
        <definition>
            <defterm>Term</defterm>
        </definition>
    </glossary>
</editor>

export const output = <editor>
    <p>Content another term content</p>
    <glossary>
        <definition>
            <defterm>Term</defterm>
        </definition>
        <definition>
            <defterm>another term<cursor/></defterm>
        </definition>
    </glossary>
</editor>
