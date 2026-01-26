/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.delete()

export const input = <editor>
    <p>
        Before<cursor/>
        <term>Term</term>
        <text/>
    </p>
    <p>After</p>
</editor>

export const output = <editor>
    <p>
        Before
        <term><cursor/>erm</term>
        <text/>
    </p>
    <p>After</p>
</editor>
