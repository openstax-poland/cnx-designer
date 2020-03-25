/** @jsx h */

import { Transforms } from 'slate'

export default editor => Transforms.insertNodes(editor, { type: 'preformat', children: [{ text: '' }] })

export const input = <editor>
    <p>Some<cursor/> preformat</p>
</editor>

export const output = <editor>
    <p>Some</p>
    <preformat><cursor/></preformat>
    <p> preformat</p>
</editor>
