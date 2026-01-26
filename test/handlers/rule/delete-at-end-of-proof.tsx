/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.delete()

export const input = <editor>
    <rule>
        <statement>
            <p>Statement</p>
        </statement>
        <proof>
            <p>Proof<cursor/></p>
        </proof>
    </rule>
    <p>After</p>
</editor>

export const output = <editor>
    <rule>
        <statement>
            <p>Statement</p>
        </statement>
        <proof>
            <p>Proof<cursor/>After</p>
        </proof>
    </rule>
</editor>
