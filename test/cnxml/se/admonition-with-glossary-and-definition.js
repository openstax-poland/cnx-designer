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
    <glossary>
        <definition>
            <defterm reference="other value">Term</defterm>
            <defmeaning>
                <p>Meaning</p>
            </defmeaning>
            <defexample>
                <p>Example</p>
            </defexample>
            <defseealso>
                <defterm>Term</defterm>
            </defseealso>
        </definition>
    </glossary>
</>

export const output = `
<document
    xmlns="http://cnx.rice.edu/cnxml"
    xmlns:cmlnle="http://katalysteducation.org/cmlnle/1.0"
    xml:lang="en"
    cnxml-version="0.7"
    module-id="test"
    id="test"
    >
    <title>Test</title>
    <content>
        <note id="n1" type="note">
            <para>Notes are serialized without the ‘type’ attribute</para>
        </note>
        <note id="n2" type="warning">
            <title>This is a title</title>
            <para>And this is a paragraph</para>
        </note>
    </content>
    <glossary>
        <definition>
            <term cmlnle:reference="other value">Term</term>
            <meaning>
                <para>Meaning</para>
            </meaning>
            <example>
                <para>Example</para>
            </example>
            <seealso>
                <term>Term</term>
            </seealso>
        </definition>
    </glossary>
</document>`
