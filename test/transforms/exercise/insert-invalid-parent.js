/** @jsx h */

import { Transforms } from '../../..'

export default editor => Transforms.insertExercise(editor)

export const input = <editor>
    <note>
        <p>A note<cursor/></p>
    </note>
</editor>

export const output = input
