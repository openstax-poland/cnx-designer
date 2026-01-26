/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.break({ shift: true }).break({ shift: true })

export const input = <editor>
    <rule>
        <statement>
            <p>State<cursor/>ment</p>
        </statement>
    </rule>
</editor>

export const output = <editor>
    <rule>
        <statement>
            <p>State</p>
            <p><text/></p>
            <p><cursor/>ment</p>
        </statement>
    </rule>
</editor>
