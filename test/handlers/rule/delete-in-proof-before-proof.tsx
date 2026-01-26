/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.delete()

export const input = <editor>
    <rule>
        <statement>
            <p>Statement</p>
        </statement>
        <proof>
            <p>Proof 1<cursor/></p>
        </proof>
        <proof>
            <p>Proof 2</p>
        </proof>
    </rule>
</editor>

export const output = <editor>
    <rule>
        <statement>
            <p>Statement</p>
        </statement>
        <proof>
            <p>Proof 1<cursor/>Proof 2</p>
        </proof>
    </rule>
</editor>
