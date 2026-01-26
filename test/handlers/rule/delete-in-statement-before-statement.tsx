/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.delete()

export const input = <editor>
    <rule>
        <statement>
            <p>Statement 1<cursor/></p>
        </statement>
        <statement>
            <p>Statement 2</p>
        </statement>
    </rule>
</editor>

export const output = <editor>
    <rule>
        <statement>
            <p>Statement 1<cursor/>Statement 2</p>
        </statement>
    </rule>
</editor>
