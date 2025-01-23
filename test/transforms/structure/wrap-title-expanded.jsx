/** @jsx h */

import { Transforms } from '../../../src'

export default editor => Transforms.wrapSectionTitle(editor)

export const input = <editor>
    <p>First para</p>
    <p>New <anchor/>title<focus/> of a section</p>
    <p>Third para</p>
    <section>
        <title>Next section</title>
        <p>Is not wrapped</p>
    </section>
</editor>

export const output = <editor>
    <p>First para</p>
    <p>New </p>
    <section>
        <title><anchor/>title<focus/></title>
        <p> of a section</p>
        <p>Third para</p>
    </section>
    <section>
        <title>Next section</title>
        <p>Is not wrapped</p>
    </section>
</editor>
