/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.break().break()

export const input = <editor>
    <code>Some code<cursor/></code>
</editor>

export const output = <editor>
    <code>Some code</code>
    <p><cursor/></p>
</editor>
