/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.delete()

export const input = <editor>
    <rule>
        <statement>
            <p>Statement</p>
        </statement>
        <ruleexample>
            <p>Example 1<cursor/></p>
        </ruleexample>
        <ruleexample>
            <p>Example 2</p>
        </ruleexample>
    </rule>
</editor>

export const output = <editor>
    <rule>
        <statement>
            <p>Statement</p>
        </statement>
        <ruleexample>
            <p>Example 1<cursor/>Example 2</p>
        </ruleexample>
    </rule>
</editor>
