/** @jsx h */

export const input = <editor>
    <rule>
        <p>Before statement</p>
        <statement>
            <p>Statement</p>
        </statement>
        <p>First bad child</p>
        <proof>
            <p>Proof</p>
        </proof>
        <p><cursor/>Second bad child</p>
        <ruleexample>
            <p>Example</p>
        </ruleexample>
        <p>Third bad child</p>
    </rule>
</editor>

export const output = <editor>
    <rule>
        <statement>
            <p>Before statement</p>
            <p>Statement</p>
            <p>First bad child</p>
        </statement>
        <proof>
            <p>Proof</p>
            <p><cursor/>Second bad child</p>
        </proof>
        <ruleexample>
            <p>Example</p>
            <p>Third bad child</p>
        </ruleexample>
    </rule>
</editor>
