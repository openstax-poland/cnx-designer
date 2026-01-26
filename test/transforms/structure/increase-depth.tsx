/** @jsx h */

import { CnxEditor, Transforms } from '../../../src'

export default (editor: CnxEditor) => Transforms.increaseSectionDepth(editor)

export const input = <editor>
    <section>
        <title>Section</title>
        <p>First para</p>
    </section>
    <section>
        <title>Nested</title>
        <p><cursor/>Second para</p>
    </section>
</editor>

export const output = <editor>
    <section>
        <title>Section</title>
        <p>First para</p>
        <section>
            <title>Nested</title>
            <p><cursor/>Second para</p>
        </section>
    </section>
</editor>
