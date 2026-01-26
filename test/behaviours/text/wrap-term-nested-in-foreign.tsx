/** @jsx h */

import { Editor, Transforms } from 'slate'

export default (editor: Editor) => Transforms.wrapNodes(
    editor, { type: 'term', children: [] }, { split: true })

export const input = <editor>
    <p>
        <text/>
        <foreign>Foreign <anchor/>term<focus/> text</foreign>
        <text/>
    </p>
</editor>

export const output = <editor>
    <p>
        <text/>
        <foreign>Foreign <term><anchor/>term<focus/></term> text</foreign>
        <text/>
    </p>
</editor>
