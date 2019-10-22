/** @jsx h */

export const inputContent = <value>
    <document>
        <preformat key="n1">
            Preformat
            {'\n'}
            more preformat
            {'\n'}
            third line
        </preformat>
        <p>Some </p>
        <preformat>preformat</preformat>
        <p> text</p>
    </document>
</value>

export const output = cnxml`
<preformat id="n1">Preformat\nmore preformat\nthird line</preformat>
<para>Some </para>
<preformat>preformat</preformat>
<para> text</para>
`
