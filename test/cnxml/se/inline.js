/** @jsx h */

export const input = <value>
    <document>
        <p>
            {"Paragraphs can contain: text, "}
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
            {"), and "}
            <link url="https://example.test">external links</link>
            .
        </p>
    </document>
</value>

export const output = cnxml`
<para>Paragraphs can contain: text,
<emphasis effect="bold">strong text</emphasis>,
<emphasis effect="italics">emphasized text</emphasis>,
<emphasis effect="underline">underlined text</emphasis>,
<sup>superscript</sup>,
<sub>subscript</sub>,
links to other elements (<link target-id="f1" />),
and <link url="https://example.test">external links</link>.</para>
`.replace(/\s+/g, ' ')
