/** @jsx h */

export default input => input.break()

export const input = <editor>
    <rule type="rule">
        <statement>
            <p>Statement</p>
        </statement>
        <ruleexample>
            <p><cursor/>Example</p>
            <p>With two paragraphs</p>
        </ruleexample>
    </rule>
</editor>

export const output = <editor>
    <rule type="rule">
        <statement>
            <p>Statement</p>
        </statement>
    </rule>
    <p><cursor/>Example</p>
    <p>With two paragraphs</p>
</editor>
