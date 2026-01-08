/** @jsx h */

export default input => input.delete()

export const input = <editor>
    <rule type="rule">
        <statement>
            <p>Statement</p>
        </statement>
        <ruleexample>
            <p>Example<cursor/></p>
        </ruleexample>
    </rule>
    <p>After</p>
</editor>

export const output = <editor>
    <rule type="rule">
        <statement>
            <p>Statement</p>
        </statement>
        <ruleexample>
            <p>Example<cursor/>After</p>
        </ruleexample>
    </rule>
</editor>
