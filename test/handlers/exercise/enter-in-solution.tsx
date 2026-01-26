/** @jsx h */

import { Simulator } from '../../util/input'
import { Editor, Element, Transforms } from 'slate'

export default (input: Simulator, editor: Editor) => {
    input.break().break()
    Transforms.select(editor,
        Editor.end(editor,
            Editor.above(editor, { match: n => Element.isElement(n) })![1]))
    input.break().break().break()
}

export const input = <editor>
    <exercise>
        <exproblem>
            <p>Problem</p>
        </exproblem>
        <exsolution>
            <p>Sol<cursor/>ution</p>
        </exsolution>
    </exercise>
</editor>

export const output = <editor>
    <exercise>
        <exproblem>
            <p>Problem</p>
        </exproblem>
        <exsolution>
            <p>Sol</p>
        </exsolution>
        <exsolution>
            <p>ution</p>
        </exsolution>
    </exercise>
    <p><text><cursor/></text></p>
</editor>
