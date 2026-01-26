/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.break()

export const input = <editor>
    <p><codeline>Some <cursor/>code</codeline></p>
</editor>

export const output = <editor>
    <p><text/><codeline>Some </codeline><text/></p>
    <p><text/><codeline><cursor/>code</codeline><text/></p>
</editor>
