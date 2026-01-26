/** @jsx h */

import { CnxEditor, Transforms } from '../../../src'

export default (editor: CnxEditor) => Transforms.wrapSectionTitle(editor)

export const input = <editor>
    <p>First para</p>
    <p>Second <cursor/>para</p>
    <p>Third para</p>
    <section>
        <title>Next section</title>
        <p>Is not wrapped</p>
    </section>
</editor>

export const output = <editor>
    <p>First para</p>
    <section>
        <title>Second <cursor/>para</title>
        <p>Third para</p>
    </section>
    <section>
        <title>Next section</title>
        <p>Is not wrapped</p>
    </section>
</editor>
