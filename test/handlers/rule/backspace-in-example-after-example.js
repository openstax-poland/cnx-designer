/** @jsx h */

export default input => input.backspace()

export const input = <editor>
    <rule type="rule">
        <statement>
            <p>Problem</p>
        </statement>
        <ruleexample>
            <p>Example 1</p>
        </ruleexample>
        <ruleexample>
            <p><cursor/>Example 2</p>
        </ruleexample>
    </rule>
</editor>

export const output = <editor>
    <rule type="rule">
        <statement>
            <p>Problem</p>
        </statement>
        <ruleexample>
            <p>Example 1<cursor/>Example 2</p>
        </ruleexample>
    </rule>
</editor>
