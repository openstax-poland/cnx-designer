/** @jsx h */

export const inputContent = <value>
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

export const output = cnxml`
<code id="n1" display="block">Code\nmore code\nthird line</code>
<para>Some <code>code</code> text</para>
`
