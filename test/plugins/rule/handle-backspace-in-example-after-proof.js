/** @jsx h */

export default editor => editor.run('onKeyDown', { key: 'Backspace' })

export const input = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>Problem</p>
            </statement>
            <proof>
                <p>Proof</p>
            </proof>
            <ruleexample>
                <p><cursor/>Example</p>
            </ruleexample>
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
                <p>Proof<cursor/>Example</p>
            </proof>
        </rule>
    </document>
</value>
