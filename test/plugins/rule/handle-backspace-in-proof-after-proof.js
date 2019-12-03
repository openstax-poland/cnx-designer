/** @jsx h */

export default editor => editor.run('onKeyDown', { key: 'Backspace' })

export const input = <value>
    <document>
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
    </document>
</value>

export const output = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>Problem</p>
            </statement>
            <proof>
                <p>Proof 1<cursor/>Proof 2</p>
            </proof>
        </rule>
    </document>
</value>
