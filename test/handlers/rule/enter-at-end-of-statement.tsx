/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.break().break()

export const input = <editor>
    <rule>
        <statement>
            <p>Statement<cursor/></p>
        </statement>
    </rule>
</editor>

export const output = <editor>
    <rule>
        <statement>
            <p>Statement</p>
        </statement>
        <statement>
            <p><cursor/></p>
        </statement>
    </rule>
</editor>
