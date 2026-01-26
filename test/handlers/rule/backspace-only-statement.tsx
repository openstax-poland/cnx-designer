/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.backspace()

export const input = <editor>
    <p>Before</p>
    <rule>
        <statement>
            <p><cursor/>Statement</p>
        </statement>
    </rule>
    <p>After</p>
</editor>

export const output = <editor>
    <p>Before<cursor/>Statement</p>
    <p>After</p>
</editor>
