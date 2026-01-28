/** @jsx h */

import { Simulator } from '../../util/input'

export default (input: Simulator) => input.backspace()

export const input = <editor>
    <p>Before</p>
    <note>
        <itemlist>
            <li><p><cursor/>First item</p></li>
            <li><p>Second item</p></li>
        </itemlist>
    </note>
    <p>After</p>
</editor>

export const output = <editor>
    <p>Before</p>
    <note>
        <p><cursor/>First item</p>
        <itemlist>
            <li><p>Second item</p></li>
        </itemlist>
    </note>
    <p>After</p>
</editor>
