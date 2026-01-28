/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.break()

export const input = <editor>
    <section>
        <title>Test<cursor/></title>
        <p><text/></p>
    </section>
</editor>

export const output = <editor>
    <section>
        <title>Test</title>
        <p><cursor/></p>
        <p><text/></p>
    </section>
</editor>
