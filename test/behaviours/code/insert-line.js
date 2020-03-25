/** @jsx h */

import { Transforms } from 'slate'

export default editor => Transforms.insertNodes(
    editor, { type: 'code', placement: 'line', children: [{ text: '' }] })

export const input = <editor>
    <p>Some<cursor/> code</p>
</editor>

export const output = <editor>
    <p>Some<codeline><cursor/></codeline> code</p>
</editor>
