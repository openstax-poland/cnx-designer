/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.delete()

export const input = <editor>
    <rule>
        <statement>
            <p>Statement<cursor/></p>
        </statement>
        <proof>
            <p>Proof</p>
        </proof>
    </rule>
</editor>

export const output = <editor>
    <rule>
        <statement>
            <p>Statement<cursor/>Proof</p>
        </statement>
    </rule>
</editor>
