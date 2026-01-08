/** @jsx h */

import { Transforms } from 'slate'

export default editor => Transforms.wrapNodes(
    editor, { type: 'foreign', children: [] }, { split: true })

export const input = <editor>
    <p>Before <anchor/>foreign<focus/> after</p>
</editor>

export const output = <editor>
    <p>Before <foreign><anchor/>foreign<focus/></foreign> after</p>
</editor>
