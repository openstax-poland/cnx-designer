/** @jsx h */

export default input => input.break().break()

export const input = <editor>
    <rule type="rule">
        <statement>
            <p>State<cursor/>ment</p>
        </statement>
        <proof>
            <p>Proof</p>
        </proof>
    </rule>
</editor>

export const output = <editor>
    <rule type="rule">
        <statement>
            <p>State</p>
        </statement>
        <statement>
            <p><cursor/>ment</p>
        </statement>
        <proof>
            <p>Proof</p>
        </proof>
    </rule>
</editor>
