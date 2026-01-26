/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.backspace()

export const input = <editor>
    <p>Before</p>
    <preformat><cursor/>Some preformat</preformat>
    <p>After</p>
</editor>

export const output = <editor>
    <p>Before<cursor/>Some preformat</p>
    <p>After</p>
</editor>
