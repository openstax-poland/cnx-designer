/** @jsx h */

import { Transforms } from 'slate'

export default editor => Transforms.wrapNodes(editor, { type: 'quotation' })

export const input = <editor>
    <p><cursor/>Some note</p>
</editor>

export const output = <editor>
    <quote>
        <p><cursor/>Some note</p>
    </quote>
</editor>
