/** @jsx h */

import { Editor, Transforms } from 'slate'

export default (editor: Editor) => Transforms.insertNodes(
    editor, { type: 'code', placement: 'block', children: [{ text: '' }] })

export const input = <editor>
    <p>Some<cursor/> code</p>
</editor>

export const output = <editor>
    <p>Some</p>
    <code><cursor/></code>
    <p> code</p>
</editor>
