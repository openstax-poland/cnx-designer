/** @jsx h */

export default input => input.delete()

export const input = <editor>
    <rule type="rule">
        <statement>
            <p>Statement 1<cursor/></p>
        </statement>
        <statement>
            <p>Statement 2</p>
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
