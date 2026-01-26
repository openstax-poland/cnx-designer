/** @jsx h */

export const input = <editor>
    <rule>
        <proof>
            <p><cursor/>Proof</p>
        </proof>
        <statement>
            <p>Statement</p>
        </statement>
        <ruleexample>
            <p>Example</p>
        </ruleexample>
        <statement>
            <p>Second statement</p>
        </statement>
    </rule>
</editor>

export const output = <editor>
    <rule>
        <statement>
            <p>Statement</p>
        </statement>
        <statement>
            <p>Second statement</p>
        </statement>
        <proof>
            <p><cursor/>Proof</p>
        </proof>
        <ruleexample>
            <p>Example</p>
        </ruleexample>
    </rule>
</editor>
