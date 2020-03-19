/** @jsx h */

export default input => input.break().break()

export const input = <editor>
    <rule type="rule">
        <statement>
            <p>Statement<cursor/></p>
        </statement>
    </rule>
</editor>

export const output = <editor>
    <rule type="rule">
        <statement>
            <p>Statement</p>
        </statement>
        <statement>
            <p><cursor/></p>
        </statement>
    </rule>
</editor>
