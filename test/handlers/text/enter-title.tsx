/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.break()

export const input = <editor>
    <section>
        <title>Te<cursor/>st</title>
        <p><text/></p>
    </section>
</editor>

export const output = <editor>
    <section>
        <title>Te</title>
        <p><cursor/>st</p>
        <p><text/></p>
    </section>
</editor>
