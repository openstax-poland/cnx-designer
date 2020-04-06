/** @jsx h */
/** @jsxFrag 'fragment' */

export const input = <>
    <note id="n1">
        <p>Notes are serialized without the ‘type’ attribute</p>
    </note>
    <note id="n2" kind="warning">
        <title>This is a title</title>
        <p>And this is a paragraph</p>
    </note>
</>

export const output = cnxml`
<note id="n1" type="note">
    <para>Notes are serialized without the ‘type’ attribute</para>
</note>
<note id="n2" type="warning">
    <title>This is a title</title>
    <para>And this is a paragraph</para>
</note>
`
