/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.break().break()

export const input = <editor>
    <definition>
        <defterm>Term</defterm>
        <defmeaning>
            <p>Meaning<cursor/></p>
        </defmeaning>
    </definition>
</editor>

export const output = <editor>
    <definition>
        <defterm>Term</defterm>
        <defmeaning>
            <p>Meaning</p>
        </defmeaning>
        <defmeaning>
            <p><cursor/></p>
        </defmeaning>
    </definition>
</editor>
