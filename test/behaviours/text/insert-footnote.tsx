/** @jsx h */

import { Editor, Transforms } from 'slate'

export default (editor: Editor) => Transforms.insertNodes(editor, {
    type: 'footnote',
    children: [{ text: ' ' }],
})

export const input = <editor>
    <p>Text<cursor/></p>
</editor>

export const output = <editor>
    <p>Text<footnote> <cursor/></footnote><text/></p>
</editor>
