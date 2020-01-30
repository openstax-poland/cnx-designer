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

export const inputGlossary = <value>
    <document>
        <definition>
            <defterm reference="other value">Term</defterm>
            <defmeaning>
                <p>Meaning</p>
                <defexample>
                    <p>Example</p>
                </defexample>
            </defmeaning>
            <defseealso>
                <defterm>Term</defterm>
            </defseealso>
        </definition>
    </document>
</value>

export const output = `
<document
  xmlns="http://cnx.rice.edu/cnxml"
  xmlns:cmlnle="http://katalysteducation.org/cmlnle/1.0">
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
