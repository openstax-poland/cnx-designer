/** @jsx h */

import { Transforms } from 'slate'

export default editor => Transforms.wrapNodes(editor, { type: 'quotation' })

export const input = <editor>
    <quote>
        <p>First paragraph</p>
        <p><cursor/>Second paragraph</p>
        <p>Third paragraph</p>
    </quote>
</editor>

export const output = <editor>
    <quote>
        <p>First paragraph</p>
        <quote>
            <p><cursor/>Second paragraph</p>
        </quote>
        <p>Third paragraph</p>
    </quote>
</editor>
