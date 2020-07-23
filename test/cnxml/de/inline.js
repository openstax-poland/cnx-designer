/** @jsx h */
/** @jsxFrag 'fragment' */

export const input = cnxml`
<para>Paragraphs can contain: text,
<term>terms</term>,
<term xmlns:cmlnle="http://katalysteducation.org/cmlnle/1.0" cmlnle:reference="other value">terms with references</term>,
<term xmlns:cxlxt="http://katalysteducation.org/cxlxt/1.0" cxlxt:index="foreign">terms with indexes</term>,
<emphasis>strong text</emphasis>,
<emphasis effect="italics">emphasized text</emphasis>,
<sup>superscript</sup>,
<sub>subscript</sub>,
links to other elements (<link target-id="f1" />),
elements in other documents (<link target-id="f1" document="d1" />),
other <link document="d1">documents</link>,
<footnote id="footnote-id">footnotes</footnote>,
<foreign xml:lang="pl">słowa obce</foreign>,
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
        <b>strong text</b>
        {", "}
        <i>emphasized text</i>
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
        {", and "}
        <link url="https://example.test">external links</link>
        .
    </p>
</document>
