/** @jsx h */

import { CnxEditor, Transforms } from '../../../src'

export default (editor: CnxEditor) => Transforms.insertExercise(editor)

export const input = <editor>
    <note>
        <p>A note<cursor/></p>
    </note>
</editor>

export const output = input
