/** @jsx h */

export default input => input.delete()

export const input = <editor>
    <rule type="rule">
        <statement>
            <p>Statement<cursor/></p>
        </statement>
    </rule>
    <p>After</p>
</editor>

export const output = <editor>
    <rule type="rule">
        <statement>
            <p>Statement<cursor/>After</p>
        </statement>
    </rule>
</editor>
