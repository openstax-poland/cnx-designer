/** @jsx h */

import { Transforms } from '../../../src'

export default editor => Transforms.decreaseSectionDepth(editor)

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
