/** @jsx h */
/** @jsxFrag 'fragment' */

export const input = <>
    <rule id="e1" kind="rule">
        <statement>
            <p>This is a statement</p>
            <p>It has multiple paragraphs</p>
        </statement>
        <ruleexample>
            <p>This rule has no proofs</p>
        </ruleexample>
    </rule>
    <rule id="e2" kind="theorem">
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
</>

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
