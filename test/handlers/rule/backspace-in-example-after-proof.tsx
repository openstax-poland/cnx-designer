/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.backspace()

export const input = <editor>
    <rule>
        <statement>
            <p>Problem</p>
        </statement>
        <proof>
            <p>Proof</p>
        </proof>
        <ruleexample>
            <p><cursor/>Example</p>
        </ruleexample>
    </rule>
</editor>

export const output = <editor>
    <rule>
        <statement>
            <p>Problem</p>
        </statement>
        <proof>
            <p>Proof<cursor/>Example</p>
        </proof>
    </rule>
</editor>
