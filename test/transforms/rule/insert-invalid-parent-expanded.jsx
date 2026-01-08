/** @jsx h */

import { Transforms } from '../../../src'

export default editor => Transforms.insertRule(editor)

export const input = <editor>
    <itemlist>
        <li>
            <p>First list</p>
        </li>
        <li>
            <p>It has four <anchor/>items</p>
        </li>
        <li>
            <p>Of which this is<focus/> third</p>
        </li>
        <li>
            <p>And this is fourth</p>
        </li>
    </itemlist>
</editor>

export const output = <editor>
    <itemlist>
        <li>
            <p>First list</p>
        </li>
    </itemlist>
    <rule type="rule">
        <statement>
            <itemlist>
                <li>
                    <p>It has four <anchor/>items</p>
                </li>
                <li>
                    <p>Of which this is<focus/> third</p>
                </li>
            </itemlist>
        </statement>
    </rule>
    <itemlist>
        <li>
            <p>And this is fourth</p>
        </li>
    </itemlist>
</editor>
