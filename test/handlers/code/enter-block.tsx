/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.break()

export const input = <editor>
    <code>Some <cursor/>code</code>
</editor>

export const output = <editor>
    <code>Some {'\n'}<cursor/>code</code>
</editor>
