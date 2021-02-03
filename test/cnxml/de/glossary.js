/** @jsx h */
/** @jsxFrag 'fragment' */

export const input = `
<document
    xmlns="http://cnx.rice.edu/cnxml"
    xmlns:cmlnle="http://katalysteducation.org/cmlnle/1.0"
    xml:lang="en"
    cnxml-version="0.7"
    module-id="test"
    >
    <title>Test</title>
    <content>
        <para>Content</para>
    </content>
    <glossary>
        <definition>
            <term>Term</term>
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
        <definition>
            <term cmlnle:reference="other value">Other term</term>
            <meaning>
                <para>Meaning</para>
            </meaning>
        </definition>
    </glossary>
</document>`

export const output = <document>
    <p>Content</p>
    <glossary>
        <definition>
            <defterm>Term</defterm>
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
        <definition>
            <defterm reference="other value">Other term</defterm>
            <defmeaning>
                <p>Meaning</p>
            </defmeaning>
        </definition>
    </glossary>
</document>
