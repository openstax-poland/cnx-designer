/** @jsx h */

import { Transforms } from 'slate'

export default editor => Transforms.wrapNodes(
    editor, { type: 'term', children: [] }, { split: true })

export const input = <editor>
    <p>Before <anchor/>term<focus/> after</p>
</editor>

export const output = <editor>
    <p>Before <term><anchor/>term<focus/></term> after</p>
</editor>
