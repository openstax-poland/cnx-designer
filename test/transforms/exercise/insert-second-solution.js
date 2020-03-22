/** @jsx h */

import { Transforms } from '../../..'

export default editor => Transforms.insertSolution(editor, { select: true })

export const input = <editor>
    <exercise>
        <exproblem>
            <p><cursor/>Problem</p>
        </exproblem>
        <exsolution>
            <p>Solution</p>
        </exsolution>
    </exercise>
</editor>

export const output = <editor>
    <exercise>
        <exproblem>
            <p>Problem</p>
        </exproblem>
        <exsolution>
            <p><cursor/></p>
        </exsolution>
        <exsolution>
            <p>Solution</p>
        </exsolution>
    </exercise>
</editor>
