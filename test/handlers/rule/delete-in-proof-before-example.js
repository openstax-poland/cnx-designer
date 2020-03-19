/** @jsx h */

export default input => input.delete()

export const input = <editor>
    <rule type="rule">
        <statement>
            <p>Statement</p>
        </statement>
        <proof>
            <p>Proof<cursor/></p>
        </proof>
        <ruleexample>
            <p>Example</p>
        </ruleexample>
    </rule>
</editor>

export const output = <editor>
    <rule type="rule">
        <statement>
            <p>Statement</p>
        </statement>
        <proof>
            <p>Proof<cursor/>Example</p>
        </proof>
    </rule>
</editor>
