/** @jsx h */
/** @jsxFrag 'fragment' */

export const input = cnxml`
<note>
    <invalid id="A">No such element</invalid>
    <para>Valid element</para>
</note>
<exercise>
    <commentary>
        <invalid id="B">No such element</invalid>
        <para>Valid element</para>
    </commentary>
</exercise>
<list>
    <item>
        <invalid id="C">No such <invalid id="D">element</invalid></invalid>
        <para>Valid element</para>
    </item>
</list>
`

export const output = <document>
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
    <itemlist>
        <li>
            <p>No such element</p>
            <p>Valid element</p>
        </li>
    </itemlist>
</document>

export const errors = [
    ['unknown-element', { namespace: 'http://cnx.rice.edu/cnxml', localName: 'invalid', id: 'A' }],
    'text-in-block', // result of unwrapping A
    ['unknown-element', { namespace: 'http://cnx.rice.edu/cnxml', localName: 'invalid', id: 'B' }],
    'text-in-block', // result of unwrapping B
    ['unknown-element', { namespace: 'http://cnx.rice.edu/cnxml', localName: 'invalid', id: 'C' }],
    ['unknown-element', { namespace: 'http://cnx.rice.edu/cnxml', localName: 'invalid', id: 'D' }],
    'text-in-block', // result of unwrapping C
    'normalized', // exercise is lacking problem
]
