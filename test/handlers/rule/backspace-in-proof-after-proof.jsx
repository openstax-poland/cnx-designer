/** @jsx h */

export default input => input.backspace()

export const input = <editor>
    <rule type="rule">
        <statement>
            <p>Problem</p>
        </statement>
        <proof>
            <p>Proof 1</p>
        </proof>
        <proof>
            <p><cursor/>Proof 2</p>
        </proof>
    </rule>
</editor>

export const output = <editor>
    <rule type="rule">
        <statement>
            <p>Problem</p>
        </statement>
        <proof>
            <p>Proof 1<cursor/>Proof 2</p>
        </proof>
    </rule>
</editor>
