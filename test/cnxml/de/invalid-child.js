/** @jsx h */

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

export const output = <value>
    <document>
        <note>
            <p>No such element</p>
            <p>Valid element</p>
        </note>
        <exercise>
            <exproblem>
                <p><text/></p>
            </exproblem>
            <excomment>
                <p>No such element</p>
                <p>Valid element</p>
            </excomment>
        </exercise>
        <ul>
            <li>
                <p>No such element</p>
                <p>Valid element</p>
            </li>
        </ul>
    </document>
</value>
