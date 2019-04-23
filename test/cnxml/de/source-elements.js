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
        On a right triangle, the sum of the squares of 
        the sides equals the square of the hypotenuse.
        </para>
    </statement>
    <proof id="pythag-proof">
        <para id="pythag-para2">
        Your favorite proof goes here.
        </para>
    </proof>
    <example id="pythag-example">
        <para id="pythag-para3">
        Take a right triangle whose sides are of length 
        3, 4, and 5. In this case the sum of the square 
        of the two shorter sides is 9+16=25. The square 
        of the hypotenuse is 25. So the theorem holds.
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
        On a right triangle, the sum of the squares of 
        the sides equals the square of the hypotenuse.
        </para>
    </statement>
    <proof id="pythag-proof">
        <para id="pythag-para2">
        Your favorite proof goes here.
        </para>
    </proof>
    <example id="pythag-example">
        <para id="pythag-para3">
        Take a right triangle whose sides are of length 
        3, 4, and 5. In this case the sum of the square 
        of the two shorter sides is 9+16=25. The square 
        of the hypotenuse is 25. So the theorem holds.
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
