/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.break()

export const input = <editor>
    <section>
        <title>Sec<cursor/>tion</title>
        <p>Paragraph</p>
    </section>
</editor>

export const output = <editor>
    <section>
        <title>Sec</title>
        <p><cursor/>tion</p>
        <p>Paragraph</p>
    </section>
</editor>
