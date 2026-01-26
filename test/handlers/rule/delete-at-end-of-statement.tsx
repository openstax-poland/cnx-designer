/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.delete()

export const input = <editor>
    <rule>
        <statement>
            <p>Statement<cursor/></p>
        </statement>
    </rule>
    <p>After</p>
</editor>

export const output = <editor>
    <rule>
        <statement>
            <p>Statement<cursor/>After</p>
        </statement>
    </rule>
</editor>
