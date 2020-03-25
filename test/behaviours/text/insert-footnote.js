/** @jsx h */

import { Transforms } from 'slate'

export default editor => Transforms.insertNodes(editor, {
    type: 'footnote',
    children: [{ text: '' }],
})

export const input = <editor>
    <p>Text<cursor/></p>
</editor>

export const output = <editor>
    <p>Text<footnote><cursor/></footnote><text/></p>
</editor>
