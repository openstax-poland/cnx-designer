/** @jsx h */
/** @jsxFrag 'fragment' */

export const input = cnxml`
<rule id="r1">
    <title>This is a rule</title>
    <statement>
        <para>This is a statement</para>
    </statement>
    <statement>
        <para>This is another statement</para>
    </statement>
    <proof>
        <para>This is a proof</para>
    </proof>
    <proof>
        <para>This is another proof</para>
    </proof>
    <example>
        <para>This is an example</para>
    </example>
    <example>
        <para>This is another example</para>
    </example>
</rule>
`

export const output = <document>
    <rule id="r1" type="rule">
        <title>This is a rule</title>
        <statement>
            <p>This is a statement</p>
        </statement>
        <statement>
            <p>This is another statement</p>
        </statement>
        <proof>
            <p>This is a proof</p>
        </proof>
        <proof>
            <p>This is another proof</p>
        </proof>
        <ruleexample>
            <p>This is an example</p>
        </ruleexample>
        <ruleexample>
            <p>This is another example</p>
        </ruleexample>
    </rule>
</document>
