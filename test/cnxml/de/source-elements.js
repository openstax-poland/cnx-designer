/** @jsx h */

export const input = cnxml`
<math>
    <mrow>
        <mfrac>
            <mn>1</mn>
            <mn>2</mn>
        </mfrac>
    </mrow>
</math>
<rule type="theorem" id="pythag-rule">
    <title>Pythagorean Theorem</title>
    <statement id="pythag-statement">
        <para id="pythag-para1">
        Text
        </para>
    </statement>
    <proof id="pythag-proof">
        <para id="pythag-para2">
        Text
        </para>
    </proof>
    <example id="pythag-example">
        <para id="pythag-para3">
        Text
        </para>
    </example>
</rule> 
<para id="spanish-hello">Normal <foreign>hola amigo</foreign> text.</para>
<equation id="simpleaddmathml">
    <title>Addition using MathML</title>
    <math>
        <apply>
        <eq/>
        <apply>
            <plus/>
            <cn>1</cn>
            <cn>2</cn>
            </apply>
        <cn>3</cn>
        </apply>
    </math>
</equation>
`

export const output = <value>
    <document>
        <source>
{
`<math xmlns="http://cnx.rice.edu/cnxml">
    <mrow>
        <mfrac>
            <mn>1</mn>
            <mn>2</mn>
        </mfrac>
    </mrow>
</math>`
}
        </source>
        <source>
{
`<rule xmlns="http://cnx.rice.edu/cnxml" type="theorem" id="pythag-rule">
    <title>Pythagorean Theorem</title>
    <statement id="pythag-statement">
        <para id="pythag-para1">
        Text
        </para>
    </statement>
    <proof id="pythag-proof">
        <para id="pythag-para2">
        Text
        </para>
    </proof>
    <example id="pythag-example">
        <para id="pythag-para3">
        Text
        </para>
    </example>
</rule>`
}
        </source>
        <p key="spanish-hello">
        {'Normal '}
        <sourceinline>
            {`<foreign xmlns="http://cnx.rice.edu/cnxml">hola amigo</foreign>`}
        </sourceinline>
        {' text.'}
        </p>
        <source>
{
`<equation xmlns="http://cnx.rice.edu/cnxml" id="simpleaddmathml">
    <title>Addition using MathML</title>
    <math>
        <apply>
        <eq/>
        <apply>
            <plus/>
            <cn>1</cn>
            <cn>2</cn>
            </apply>
        <cn>3</cn>
        </apply>
    </math>
</equation>`
}
        </source>
    </document>
</value>
