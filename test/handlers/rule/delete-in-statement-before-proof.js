/** @jsx h */

export default input => input.delete()

export const input = <editor>
    <rule type="rule">
        <statement>
            <p>Statement<cursor/></p>
        </statement>
        <proof>
            <p>Proof</p>
        </proof>
    </rule>
</editor>

export const output = <editor>
    <rule type="rule">
        <statement>
            <p>Statement<cursor/>Proof</p>
        </statement>
    </rule>
</editor>
