/** @jsx h */

import { Transforms } from 'slate'

export default editor => Transforms.wrapNodes(
    editor, { type: 'term', children: [] }, { split: true })

export const input = <editor>
    <p>
        <term>Term <anchor/>term<focus/> term</term>
    </p>
</editor>

export const output = input
