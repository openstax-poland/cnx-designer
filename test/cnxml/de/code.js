/** @jsx h */
/** @jsxFrag 'fragment' */

export const input = cnxml`
<code id="n1" display="block" lang="PHP">Code\nmore code\nthird line</code>
<para>Some <code>code</code> text</para>
`

export const output = <document>
    <code id="n1" language="PHP">
        Code
        {'\n'}
        more code
        {'\n'}
        third line
    </code>
    <p>Some <codeline>code</codeline> text</p>
</document>
