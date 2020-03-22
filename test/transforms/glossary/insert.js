/** @jsx h */

import { Transforms } from '../../..'

export default editor => Transforms.addGlossaryDefinition(editor, { select: true })

export const input = <editor>
    <p>Content</p>
    <glossary>
        <definition>
            <defterm>Term<cursor/></defterm>
        </definition>
    </glossary>
</editor>

export const output = <editor>
    <p>Content</p>
    <glossary>
        <definition>
            <defterm>Term</defterm>
        </definition>
        <definition>
            <defterm><cursor/></defterm>
        </definition>
    </glossary>
</editor>
