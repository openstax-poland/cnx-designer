/** @jsx h */

import { List } from 'immutable'

export const input = cnxml`
<note>
    <invalid>No such element</invalid>
    <para>Valid element</para>
</note>
<exercise>
    <commentary>
        <invalid>No such element</invalid>
        <para>Valid element</para>
    </commentary>
</exercise>
<list>
    <item>
        <invalid>No such <invalid>element</invalid></invalid>
        <para>Valid element</para>
    </item>
</list>
`

export const outputContent = <value>
    <document>
        <note class={List()}>
            <p>No such element</p>
            <p>Valid element</p>
        </note>
        <exercise class={List()}>
            <exproblem>
                <p><text/></p>
            </exproblem>
            <excomment>
                <p>No such element</p>
                <p>Valid element</p>
            </excomment>
        </exercise>
        <ul class={List()}>
            <li>
                <p>No such element</p>
                <p>Valid element</p>
            </li>
        </ul>
    </document>
</value>
