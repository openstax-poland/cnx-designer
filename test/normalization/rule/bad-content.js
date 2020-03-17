/** @jsx h */

export const input = <editor>
    <rule type="rule">
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
    <rule type="rule">
        <statement>
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
