/** @jsx h */

import { Editor, Transforms } from 'slate'

export default (editor: Editor) => Transforms.wrapNodes(editor, { type: 'quotation', children: [] })

export const input = <editor>
    <p><cursor/>Some note</p>
</editor>

export const output = <editor>
    <quote>
        <p><cursor/>Some note</p>
    </quote>
</editor>
