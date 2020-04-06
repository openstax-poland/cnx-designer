/** @jsx h */
/** @jsxFrag 'fragment' */

export const input = cnxml`
<preformat id="n1">Preformat\nmore preformat\nthird line</preformat>
<para>Some <preformat display="inline">preformat</preformat> text</para>
`

export const output = <document>
    <preformat id="n1">
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
