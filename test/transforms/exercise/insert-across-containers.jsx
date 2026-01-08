/** @jsx h */

import { Transforms } from '../../../src'

export default editor => Transforms.insertExercise(editor)

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
    <exercise>
        <exproblem>
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
        </exproblem>
    </exercise>
    <enumlist>
        <li>
            <p>It also has two items</p>
        </li>
    </enumlist>
</editor>
