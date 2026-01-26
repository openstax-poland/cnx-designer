/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.break().break()

export const input = <editor>
    <rule>
        <statement>
            <p>State<cursor/>ment</p>
        </statement>
        <proof>
            <p>Proof</p>
        </proof>
    </rule>
</editor>

export const output = <editor>
    <rule>
        <statement>
            <p>State</p>
        </statement>
        <statement>
            <p><cursor/>ment</p>
        </statement>
        <proof>
            <p>Proof</p>
        </proof>
    </rule>
</editor>
