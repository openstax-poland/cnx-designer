/** @jsx h */

import { Editor, Text, Transforms } from 'slate'

export default editor => Transforms.wrapNodes(
    editor, { type: 'code', placement: 'line', children: [] }, { split: true })

export const input = <editor>
    <p>Some <anchor/>code<focus/></p>
</editor>

export const output = <editor>
    <p>Some <codeline><anchor/>code<focus/></codeline><text/></p>
</editor>
