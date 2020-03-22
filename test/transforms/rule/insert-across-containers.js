/** @jsx h */

import { Transforms } from '../../..'

export default editor => Transforms.insertRule(editor)

export const input = <editor>
    <itemlist>
        <li>
            <p>First list</p>
        </li>
        <li>
            <p>It has two <anchor/>items</p>
        </li>
    </itemlist>
    <p>Paragraph between lists</p>
    <enumlist>
        <li>
            <p>Second<focus/> list</p>
        </li>
        <li>
            <p>It also has two items</p>
        </li>
    </enumlist>
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
                    <p>It has two <anchor/>items</p>
                </li>
            </itemlist>
            <p>Paragraph between lists</p>
            <enumlist>
                <li>
                    <p>Second<focus/> list</p>
                </li>
            </enumlist>
        </statement>
    </rule>
    <enumlist>
        <li>
            <p>It also has two items</p>
        </li>
    </enumlist>
</editor>
