/** @jsx h */

import { Editor, Transforms } from 'slate'

export default (editor: Editor) => Transforms.insertNodes(
    editor, { type: 'code', placement: 'line', children: [{ text: ' ' }] }, /*{ split: true }*/)

export const input = <editor>
    <p>Some<cursor/> code</p>
</editor>

export const output = <editor>
    <p>Some<codeline> <cursor/></codeline> code</p>
</editor>
