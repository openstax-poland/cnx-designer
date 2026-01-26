/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.break()

export const input = <editor>
    <note>
        <p>
            <text>before</text>
            <xref target="target"><text/></xref>
            <text><cursor/>after</text>
        </p>
    </note>
</editor>

export const output = <editor>
    <note>
        <p>
            <text>before</text>
            <xref target="target"><text/></xref>
            <text/>
        </p>
        <p>
            <text><cursor/>after</text>
        </p>
    </note>
</editor>
