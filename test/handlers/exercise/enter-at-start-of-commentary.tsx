/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.break()

export const input = <editor>
    <exercise>
        <exproblem>
            <p>Problem</p>
        </exproblem>
        <excomment>
            <p><cursor/>Commentary</p>
            <p>With two paragraphs</p>
        </excomment>
    </exercise>
</editor>

export const output = <editor>
    <exercise>
        <exproblem>
            <p>Problem</p>
        </exproblem>
    </exercise>
    <p><cursor/>Commentary</p>
    <p>With two paragraphs</p>
</editor>
