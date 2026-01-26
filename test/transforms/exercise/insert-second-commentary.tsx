/** @jsx h */

import { CnxEditor, Transforms } from '../../../src'

export default (editor: CnxEditor) => Transforms.insertCommentary(editor, { select: true })

export const input = <editor>
    <exercise>
        <exproblem>
            <p>Problem</p>
        </exproblem>
        <excomment>
            <p>Com<cursor/>mentary</p>
        </excomment>
    </exercise>
</editor>

export const output = <editor>
    <exercise>
        <exproblem>
            <p>Problem</p>
        </exproblem>
        <excomment>
            <p>Com<cursor/>mentary</p>
        </excomment>
    </exercise>
</editor>
