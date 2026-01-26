/** @jsx h */

import { CnxEditor, Transforms } from '../../../src'

export default (editor: CnxEditor) => Transforms.addGlossaryDefinition(editor, { select: true })

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
