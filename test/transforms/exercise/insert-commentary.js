/** @jsx h */

import { Transforms } from '../../../src'

export default editor => Transforms.insertCommentary(editor, { select: true })

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
        <excomment>
            <p><text><cursor/></text></p>
        </excomment>
    </exercise>
</editor>
