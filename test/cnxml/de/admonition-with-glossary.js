/* eslint-disable max-len */
/** @jsx h */

import { List } from 'immutable'

export const input = `
<document
  xmlns="http://cnx.rice.edu/cnxml"
  xmlns:cmlnle="http://katalysteducation.org/cmlnle/1.0">
    <content>
        <note id="n1">
            <para>Notes' default type is ‘note’.</para>
        </note>
        <note id="n2" type="warning">
            <title>This is a title</title>
            <para>And this is a paragraph</para>
        </note>
        <note id="n3" type="tip">Notes can also have text content.</note>
    </content>
    <glossary>
        <definition>
            <term>Term (pl. <foreign xml:lang="pl"><term>termin</term></foreign>)</term>
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

export const outputContent = <value>
    <document>
        <note key="n1" type="note" class={List()}>
            <p>Notes&apos; default type is ‘note’.</p>
        </note>
        <note key="n2" type="warning" class={List()}>
            <title>This is a title</title>
            <p>And this is a paragraph</p>
        </note>
        <note key="n3" type="tip" class={List()}>
            <p>Notes can also have text content.</p>
        </note>
    </document>
</value>

export const outputGlossary = <value>
    <document>
        <definition class={List()}>
            <defterm>Term (pl. <foreign lang="pl"><text/><term reference={null}>termin</term><text/></foreign>)</defterm>
            <defmeaning class={List()}>
                <p>Meaning</p>
                <defexample class={List()}>
                    <p>Example</p>
                </defexample>
            </defmeaning>
            <defseealso class={List()}>
                <defterm>Term</defterm>
            </defseealso>
        </definition>
        <definition class={List()}>
            <defterm reference="other value">Other term</defterm>
            <defmeaning class={List()}>
                <p>Meaning</p>
            </defmeaning>
        </definition>
    </document>
</value>
