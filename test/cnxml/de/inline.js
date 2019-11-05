/** @jsx h */

/* eslint-disable react/jsx-curly-brace-presence, max-len */

export const input = cnxml`
<para>Paragraphs can contain: text,
<term>terms</term>,
<term xmlns:cmlnle="http://katalysteducation.org/cmlnle/1.0" cmlnle:reference="other value">terms with references</term>,
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
and <link url="https://example.test">external links</link>.</para>
`.replace(/\s+/g, ' ')

export const outputContent = <value>
    <document>
        <p>
            {"Paragraphs can contain: text, "}
            <term reference={null}>terms</term>
            {", "}
            <term reference="other value">terms with references</term>
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
            <xref target="f1" case={null} document={null}><text/></xref>
            {"), elements in other documents ("}
            <xref target="f1" case={null} document="d1"><text/></xref>
            {"), other "}
            <docref document="d1">documents</docref>
            {", "}
            <footnote key="footnote-id">footnotes</footnote>
            {", "}
            <foreign lang="pl">słowa obce</foreign>
            {", and "}
            <link url="https://example.test">external links</link>
            .
        </p>
    </document>
</value>
