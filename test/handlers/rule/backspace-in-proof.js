/** @jsx h */

export default input => input.backspace()

export const input = <editor>
    <rule type="rule">
        <statement>
            <p>Statement</p>
        </statement>
        <proof>
            <p><cursor/>Proof</p>
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
