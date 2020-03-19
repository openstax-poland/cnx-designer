/** @jsx h */

export default input => input.break().break().break()

export const input = <editor>
    <rule type="rule">
        <statement>
            <p>Statement</p>
        </statement>
        <ruleexample>
            <p>Example<cursor/></p>
        </ruleexample>
    </rule>
</editor>

export const output = <editor>
    <rule type="rule">
        <statement>
            <p>Statement</p>
        </statement>
        <ruleexample>
            <p>Example</p>
        </ruleexample>
    </rule>
    <p><cursor/></p>
</editor>
