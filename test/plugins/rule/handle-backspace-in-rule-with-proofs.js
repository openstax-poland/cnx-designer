/** @jsx h */

export default editor => editor.run('onKeyDown', { key: 'Backspace' })

export const input = <value>
    <document>
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
    </document>
</value>

export const output = <value>
    <document>
        <p>Before<cursor/>Statement</p>
        <rule type="rule">
            <statement>
                <p><text/></p>
            </statement>
            <proof>
                <p>Proof</p>
            </proof>
        </rule>
        <p>After</p>
    </document>
</value>

