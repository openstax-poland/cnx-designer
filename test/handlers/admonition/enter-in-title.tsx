/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.break()

export const input = <editor>
    <note>
        <title>Title <cursor/>text</title>
        <p>Some note</p>
    </note>
</editor>

export const output = <editor>
    <note>
        <title>Title </title>
        <p><cursor/>text</p>
        <p>Some note</p>
    </note>
</editor>
