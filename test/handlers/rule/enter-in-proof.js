/** @jsx h */

import { Editor, Element, Transforms } from 'slate'

export default (input, editor) => {
    input.break().break()
    Transforms.select(editor, Editor.end(editor, Editor.above(editor, { match: Element.isElement })[1]))
    input.break().break().break()
}

export const input = <editor>
    <rule type="rule">
        <statement>
            <p>Statement</p>
        </statement>
        <proof>
            <p>Pro<cursor/>of</p>
        </proof>
    </rule>
</editor>

export const output = <editor>
    <rule type="rule">
        <statement>
            <p>Statement</p>
        </statement>
        <proof>
            <p>Pro</p>
        </proof>
        <proof>
            <p>of</p>
        </proof>
    </rule>
    <p><cursor/></p>
</editor>
