/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.delete()

export const input = <editor>
    <exercise>
        <exproblem>
            <p>Problem<cursor/></p>
        </exproblem>
        <exsolution>
            <p>Solution</p>
        </exsolution>
    </exercise>
</editor>

export const output = <editor>
    <exercise>
        <exproblem>
            <p>Problem<cursor/>Solution</p>
        </exproblem>
    </exercise>
</editor>
