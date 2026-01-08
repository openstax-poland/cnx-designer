/** @jsx h */

export default input => input.delete()

export const input = <editor>
    <rule type="rule">
        <statement>
            <p>Statement</p>
        </statement>
        <proof>
            <p>Proof 1<cursor/></p>
        </proof>
        <proof>
            <p>Proof 2</p>
        </proof>
    </rule>
</editor>

export const output = <editor>
    <rule type="rule">
        <statement>
            <p>Statement</p>
        </statement>
        <proof>
            <p>Proof 1<cursor/>Proof 2</p>
        </proof>
    </rule>
</editor>
