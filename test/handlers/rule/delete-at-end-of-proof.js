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
    </rule>
    <p>After</p>
</editor>

export const output = <editor>
    <rule type="rule">
        <statement>
            <p>Statement</p>
        </statement>
        <proof>
            <p>Proof<cursor/>After</p>
        </proof>
    </rule>
</editor>
