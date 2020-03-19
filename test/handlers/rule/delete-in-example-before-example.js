/** @jsx h */

export default input => input.delete()

export const input = <editor>
    <rule type="rule">
        <statement>
            <p>Statement</p>
        </statement>
        <ruleexample>
            <p>Example 1<cursor/></p>
        </ruleexample>
        <ruleexample>
            <p>Example 2</p>
        </ruleexample>
    </rule>
</editor>

export const output = <editor>
    <rule type="rule">
        <statement>
            <p>Statement</p>
        </statement>
        <ruleexample>
            <p>Example 1<cursor/>Example 2</p>
        </ruleexample>
    </rule>
</editor>
