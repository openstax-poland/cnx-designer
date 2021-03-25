/** @jsx h */

import { Editor, Element, Transforms } from 'slate'

export default (input, editor) => {
    input.break().break()
    Transforms.select(editor, Editor.end(editor, Editor.above(editor, { match: Element.isElement })[1]))
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
