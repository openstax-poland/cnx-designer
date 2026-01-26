/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.break().break()

export const input = <editor>
    <rule>
        <statement>
            <p>Statement</p>
        </statement>
        <proof>
            <p>Proof<cursor/></p>
        </proof>
    </rule>
</editor>

export const output = <editor>
    <rule>
        <statement>
            <p>Statement</p>
        </statement>
        <proof>
            <p>Proof</p>
        </proof>
        <proof>
            <p><cursor/></p>
        </proof>
    </rule>
</editor>
