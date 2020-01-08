/** @jsx h */

export default editor => editor.run('onKeyDown', { key: 'Enter' })

export const input = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>Statement</p>
            </statement>
            <ruleexample>
                <p><cursor/>Example</p>
                <p>With two paragraphs</p>
            </ruleexample>
        </rule>
    </document>
</value>

export const output = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>Statement</p>
            </statement>
        </rule>
        <p><cursor/>Example</p>
        <p>With two paragraphs</p>
    </document>
</value>
