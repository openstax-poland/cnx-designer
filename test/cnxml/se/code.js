/** @jsx h */
/** @jsxFrag 'fragment' */

export const input = <>
    <code id="n1">
        Code
        {'\n'}
        more code
        {'\n'}
        third line
    </code>
    <p>Some <codeline language="PHP">code</codeline> text</p>
</>

export const output = cnxml`
<code id="n1" display="block">Code\nmore code\nthird line</code>
<para>Some <code lang="PHP">code</code> text</para>
`
