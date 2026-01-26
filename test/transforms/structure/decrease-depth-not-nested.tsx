/** @jsx h */

import { CnxEditor, Transforms } from '../../../src'

export default (editor: CnxEditor) => Transforms.decreaseSectionDepth(editor)

export const input = <editor>
    <section>
        <title>Test</title>
        <p><cursor/>Paragraph</p>
    </section>
</editor>

export const output = <editor>
    <section>
        <title>Test</title>
        <p><cursor/>Paragraph</p>
    </section>
</editor>
