/** @jsx h */

export const input = cnxml`
<code id="n1" display="block" lang="PHP">Code\nmore code\nthird line</code>
<para>Some <code>code</code> text</para>
`

export const outputContent = <value>
    <document>
        <code key="n1" lang="PHP">
            Code
            {'\n'}
            more code
            {'\n'}
            third line
        </code>
        <p>Some <codeinline>code</codeinline> text</p>
    </document>
</value>
