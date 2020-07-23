/** @jsx h */

import { Transforms } from '../../../src'

export default editor => Transforms.decreaseSectionDepth(editor)

export const input = <editor>
    <section>
        <title>Section</title>
        <p>First para</p>
        <section>
            <title>Nested</title>
            <p><cursor/>Second para</p>
        </section>
    </section>
</editor>

export const output = <editor>
    <section>
        <title>Section</title>
        <p>First para</p>
    </section>
    <section>
        <title>Nested</title>
        <p><cursor/>Second para</p>
    </section>
</editor>
