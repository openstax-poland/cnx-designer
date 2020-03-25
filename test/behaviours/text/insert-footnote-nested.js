/** @jsx h */

import { Transforms } from 'slate'

export default editor => Transforms.insertNodes(
    editor, { type: 'footnote', children: [{ text: '' }] }, { split: true })

export const input = <editor>
    <p>
        <text/><footnote>Footnote <cursor/> footnote</footnote><text/>
    </p>
</editor>

export const output = input
