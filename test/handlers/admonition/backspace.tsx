/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.backspace()

export const input = <editor>
    <p>Before</p>
    <note>
        <p><cursor/>Some note</p>
    </note>
    <p>After</p>
</editor>

export const output = <editor>
    <p>Before<cursor/>Some note</p>
    <p>After</p>
</editor>
