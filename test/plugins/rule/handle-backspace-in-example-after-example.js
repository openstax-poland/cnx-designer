/** @jsx h */

export default editor => editor.run('onKeyDown', { key: 'Backspace' })

export const input = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>Problem</p>
            </statement>
            <ruleexample>
                <p>Example 1</p>
            </ruleexample>
            <ruleexample>
                <p><cursor/>Example 2</p>
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
            <ruleexample>
                <p>Example 1<cursor/>Example 2</p>
            </ruleexample>
        </rule>
    </document>
</value>
