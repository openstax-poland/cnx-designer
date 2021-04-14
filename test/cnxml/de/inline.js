/** @jsx h */
/** @jsxFrag 'fragment' */

export const input = cnxml`
<para>Paragraphs can contain: text,
<term>terms</term>,
<term xmlns:cmlnle="http://katalysteducation.org/cmlnle/1.0" cmlnle:reference="other value">terms with references</term>,
<term xmlns:cxlxt="http://katalysteducation.org/cxlxt/1.0" cxlxt:index="foreign">terms with indexes</term>,
<term xmlns:cxlxt="http://katalysteducation.org/cxlxt/1.0" cxlxt:index="name" cxlxt:name="John Doe" cxlxt:born="1950" cxlxt:died="2020">terms with name index</term>,
<emphasis>strong text</emphasis>,
<emphasis effect="italics">emphasized text</emphasis>,
<emphasis effect="underline">underlined text</emphasis>,
<sup>superscript</sup>,
<sub>subscript</sub>,
links to other elements (<link target-id="f1" />),
elements in other documents (<link target-id="f1" document="d1" />),
other <link document="d1">documents</link>,
<footnote id="footnote-id">footnotes</footnote>,
<foreign xml:lang="pl">słowa obce</foreign>,
<foreign xml:lang="en"><term xmlns:cxlxt="http://katalysteducation.org/cxlxt/1.0" cxlxt:index="foreign">term inside foreign - from not formatted xml</term></foreign>,
<foreign xml:lang="en">
    <term xmlns:cxlxt="http://katalysteducation.org/cxlxt/1.0" cxlxt:index="foreign">term inside foreign - from formatted xml</term>
</foreign>,
and <link url="https://example.test">external links</link>.</para>
`.replace(/\s+/g, ' ')

export const output = <document>
    <p>
        {"Paragraphs can contain: text, "}
        <term>terms</term>
        {", "}
        <term reference="other value">terms with references</term>
        {", "}
        <term index="foreign">terms with indexes</term>
        {", "}
        <term index="name" name="John Doe" born={1950} died={2020}>terms with name index</term>
        {", "}
        <b>strong text</b>
        {", "}
        <i>emphasized text</i>
        {", "}
        <u>underlined text</u>
        {", "}
        <sup>superscript</sup>
        {", "}
        <sub>subscript</sub>
        , links to other elements (
        <xref target="f1"><text/></xref>
        {"), elements in other documents ("}
        <xref target="f1" document="d1"><text/></xref>
        {"), other "}
        <docref document="d1">documents</docref>
        {", "}
        <footnote id="footnote-id">footnotes</footnote>
        {", "}
        <foreign language="pl">słowa obce</foreign>
        {", "}
        <foreign language="en"><text/><term index="foreign">term inside foreign - from not formatted xml</term><text/></foreign>
        {", "}
        <foreign language="en"><text/><term index="foreign">term inside foreign - from formatted xml</term><text/></foreign>
        {" , and "}
        <link url="https://example.test">external links</link>
        .
    </p>
</document>
