/** @jsx h */

export const inputContent = <value>
    <document>
        <note key="n1" type="note">
            <p>Notes are serialized without the ‘type’ attribute</p>
        </note>
        <note key="n2" type="warning">
            <title>This is a title</title>
            <p>And this is a paragraph</p>
        </note>
    </document>
</value>

export const output = cnxml`
<note id="n1" type="note">
    <para>Notes are serialized without the ‘type’ attribute</para>
</note>
<note id="n2" type="warning">
    <title>This is a title</title>
    <para>And this is a paragraph</para>
</note>
`
