/** @jsx h */

import { Transforms } from '../../..'

export default editor => Transforms.insertSolution(editor, { select: true })

export const input = <editor>
    <exercise>
        <exproblem>
            <p><cursor/>Problem</p>
        </exproblem>
    </exercise>
</editor>

export const output = <editor>
    <exercise>
        <exproblem>
            <p>Problem</p>
        </exproblem>
        <exsolution>
            <p><text><cursor/></text></p>
        </exsolution>
    </exercise>
</editor>
