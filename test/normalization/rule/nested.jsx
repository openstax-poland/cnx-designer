/** @jsx h */

export const input = <editor>
    <rule type="rule">
        <statement>
            <p>Before</p>
            <rule type="rule">
                <statement>
                    <p><cursor/>Statement</p>
                </statement>
                <proof>
                    <p>Proof</p>
                </proof>
            </rule>
            <p>After</p>
        </statement>
    </rule>
</editor>

export const output = <editor>
    <rule>
        <statement>
            <p>Before</p>
            <p><cursor/>Statement</p>
            <p>Proof</p>
            <p>After</p>
        </statement>
    </rule>
</editor>
