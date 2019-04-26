/** @jsx h */

export const input = <value>
    <document>
        <source>
{`
<math xmlns="https://www.w3.org/1998/Math/MathML">
    <mrow>
        <mfrac>
            <mn>1</mn>
            <mn>2</mn>
        </mfrac>
    </mrow>
</math>
`}
        </source>
    </document>
</value>

export const output = cnxml`
<math xmlns="https://www.w3.org/1998/Math/MathML">
    <mrow>
        <mfrac>
            <mn>1</mn>
            <mn>2</mn>
        </mfrac>
    </mrow>
</math>
`