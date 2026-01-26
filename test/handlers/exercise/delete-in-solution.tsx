/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.delete()

export const input = <editor>
    <exercise>
        <exproblem>
            <p>Problem</p>
        </exproblem>
        <exsolution>
            <p>Solution<cursor/></p>
        </exsolution>
        <excomment>
            <p>Comment</p>
        </excomment>
    </exercise>
</editor>

export const output = <editor>
    <exercise>
        <exproblem>
            <p>Problem</p>
        </exproblem>
        <exsolution>
            <p>Solution<cursor/>Comment</p>
        </exsolution>
    </exercise>
</editor>
