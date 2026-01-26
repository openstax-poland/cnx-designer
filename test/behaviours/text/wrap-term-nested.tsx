/** @jsx h */

import { Editor, Transforms } from 'slate'

export default (editor: Editor) => Transforms.wrapNodes(
    editor, { type: 'term', children: [] }, { split: true })

export const input = <editor>
    <p>
        <term>Term <anchor/>term<focus/> term</term>
    </p>
</editor>

export const output = input
