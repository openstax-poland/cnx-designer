/** @jsx h */

export const input = <value>
    <document>
        <source>
{`
<math>
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
<math xmlns="">
    <mrow>
        <mfrac>
            <mn>1</mn>
            <mn>2</mn>
        </mfrac>
    </mrow>
</math>
`
