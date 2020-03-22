/** @jsx h */

import { Transforms } from '../../..'

export default editor => Transforms.addGlossaryDefinition(editor, { select: true })

export const input = <editor>
    <p>Content<cursor/></p>
</editor>

export const output = <editor>
    <p>Content</p>
    <glossary>
        <definition>
            <defterm><cursor/></defterm>
        </definition>
    </glossary>
</editor>
