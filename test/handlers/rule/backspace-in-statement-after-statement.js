/** @jsx h */

export default input => input.backspace()

export const input = <editor>
    <rule type="rule">
        <statement>
            <p>Statement 1</p>
        </statement>
        <statement>
            <p><cursor/>Statement 2</p>
        </statement>
    </rule>
</editor>

export const output = <editor>
    <rule type="rule">
        <statement>
            <p>Statement 1<cursor/>Statement 2</p>
        </statement>
    </rule>
</editor>
