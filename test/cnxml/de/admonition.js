/** @jsx h */
/** @jsxFrag 'fragment' */

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

export const output = <document>
    <note id="n1" kind="note">
        <p>Notes&apos; default type is ‘note’.</p>
    </note>
    <note id="n2" kind="warning">
        <title>This is a title</title>
        <p>And this is a paragraph</p>
    </note>
    <note id="n3" kind="tip">
        <p>Notes can also have text content.</p>
    </note>
</document>
