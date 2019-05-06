/** @jsx h */

export const input = cnxml`
<code id="n1" display="block">Code\nmore code\nthird line</code>
<para>Some <code>code</code> text</para>
`

export const output = <value>
    <document>
        <code key="n1">
            Code
            {'\n'}
            more code
            {'\n'}
            third line
        </code>
        <p>Some <codeinline>code</codeinline> text</p>
    </document>
</value>
