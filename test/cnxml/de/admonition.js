/** @jsx h */

export const input = cnxml`
<note id="n1">
    <para>Notes' default type is ‘note’.</para>
</note>
<note id="n2" type="warning">
    <title>This is a title</title>
    <para>And this is a paragraph</para>
</note>
<note id="n3" type="tip">Notes can also have text content.</note>
`

export const output = <value>
    <document>
        <note type="note">
            <p>Notes' default type is ‘note’.</p>
        </note>
        <note type="warning">
            <title>This is a title</title>
            <p>And this is a paragraph</p>
        </note>
        <note type="tip">
            <p>Notes can also have text content.</p>
        </note>
    </document>
</value>
