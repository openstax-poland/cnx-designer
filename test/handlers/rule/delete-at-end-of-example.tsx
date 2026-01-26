/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.delete()

export const input = <editor>
    <rule>
        <statement>
            <p>Statement</p>
        </statement>
        <ruleexample>
            <p>Example<cursor/></p>
        </ruleexample>
    </rule>
    <p>After</p>
</editor>

export const output = <editor>
    <rule>
        <statement>
            <p>Statement</p>
        </statement>
        <ruleexample>
            <p>Example<cursor/>After</p>
        </ruleexample>
    </rule>
</editor>
