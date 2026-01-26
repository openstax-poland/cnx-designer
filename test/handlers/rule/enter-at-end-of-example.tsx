/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.break().break().break()

export const input = <editor>
    <rule>
        <statement>
            <p>Statement</p>
        </statement>
        <ruleexample>
            <p>Example<cursor/></p>
        </ruleexample>
    </rule>
</editor>

export const output = <editor>
    <rule>
        <statement>
            <p>Statement</p>
        </statement>
        <ruleexample>
            <p>Example</p>
        </ruleexample>
    </rule>
    <p><cursor/></p>
</editor>
