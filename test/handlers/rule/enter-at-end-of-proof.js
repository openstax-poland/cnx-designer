/** @jsx h */

export default input => input.break().break()

export const input = <editor>
    <rule type="rule">
        <statement>
            <p>Statement</p>
        </statement>
        <proof>
            <p>Proof<cursor/></p>
        </proof>
    </rule>
</editor>

export const output = <editor>
    <rule type="rule">
        <statement>
            <p>Statement</p>
        </statement>
        <proof>
            <p>Proof</p>
        </proof>
        <proof>
            <p><cursor/></p>
        </proof>
    </rule>
</editor>
