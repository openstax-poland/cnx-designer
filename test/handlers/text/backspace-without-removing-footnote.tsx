/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.backspace().backspace().backspace()

export const input = <editor>
    <p>Before <footnote>Fo<cursor/>otnote</footnote><text/></p>
    <p>After</p>
</editor>

export const output = <editor>
    <p>Before<cursor/><footnote>otnote</footnote><text/></p>
    <p>After</p>
</editor>
