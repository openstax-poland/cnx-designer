/** @jsx h */

export const inputContent = <value>
    <document>
        <rule key="e1" type="rule">
            <statement>
                <p>This is a statement</p>
                <p>It has multiple paragraphs</p>
            </statement>
            <ruleexample>
                <p>This rule has no proofs</p>
            </ruleexample>
        </rule>
        <rule key="e2" type="theorem">
            <title>Rules can have titles</title>
            <statement>
                <p>This is another statement</p>
            </statement>
            <proof>
                <p>First proof</p>
            </proof>
            <proof>
                <p>Second proof</p>
                <p>Proofs can have multiple paragraphs</p>
            </proof>
            <ruleexample>
                <p>This statement has two proofs</p>
                <p>Examples can have multiple paragraphs as well</p>
            </ruleexample>
        </rule>
    </document>
</value>

export const output = cnxml`
<rule id="e1">
    <statement>
        <para>This is a statement</para>
        <para>It has multiple paragraphs</para>
    </statement>
    <example>
        <para>This rule has no proofs</para>
    </example>
</rule>
<rule id="e2" type="theorem">
    <title>Rules can have titles</title>
    <statement>
        <para>This is another statement</para>
    </statement>
    <proof>
        <para>First proof</para>
    </proof>
    <proof>
        <para>Second proof</para>
        <para>Proofs can have multiple paragraphs</para>
    </proof>
    <example>
        <para>This statement has two proofs</para>
        <para>Examples can have multiple paragraphs as well</para>
    </example>
</rule>
`
