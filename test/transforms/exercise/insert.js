/** @jsx h */

import { Transforms } from '../../..'

export default editor => Transforms.insertExercise(editor)

export const input = <editor>
    <p>Ex<anchor/>erc<focus/>ise</p>
</editor>

export const output = <editor>
    <exercise>
        <exproblem>
            <p>Ex<anchor/>erc<focus/>ise</p>
        </exproblem>
    </exercise>
</editor>
