/** @jsx h */

export default editor => {
    editor.run('onKeyDown', { key: 'Enter' })
    editor.run('onKeyDown', { key: 'Enter' })
    editor.run('onKeyDown', { key: 'Enter' })
}

export const input = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>Statement</p>
            </statement>
            <ruleexample>
                <p>Example<cursor/></p>
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
            <ruleexample>
                <p>Example</p>
            </ruleexample>
        </rule>
        <p><cursor/></p>
    </document>
</value>
