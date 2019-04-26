/** @jsx h */

export const input = <value>
    <document>
        <source>
{`
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
`}
        </source>
        <source>
{`
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
`}
        </source>
    </document>
</value>

export const output = cnxml`
<rule xmlns="" type="theorem" id="pythag-rule">
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
<equation xmlns="" id="simpleaddmathml">
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
