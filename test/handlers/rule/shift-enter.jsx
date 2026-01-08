/** @jsx h */

export default input => input.break({ shift: true }).break({ shift: true })

export const input = <editor>
    <rule type="rule">
        <statement>
            <p>State<cursor/>ment</p>
        </statement>
    </rule>
</editor>

export const output = <editor>
    <rule type="rule">
        <statement>
            <p>State</p>
            <p><text/></p>
            <p><cursor/>ment</p>
        </statement>
    </rule>
</editor>
