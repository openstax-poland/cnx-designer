/** @jsx h */

export default editor => {
    editor.run('onKeyDown', { key: 'Enter' })
    editor.run('onKeyDown', { key: 'Enter' })
    editor.moveToEndOfBlock()
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
                <p>Ex<cursor/>ample</p>
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
                <p>Ex</p>
            </ruleexample>
            <ruleexample>
                <p>ample</p>
            </ruleexample>
        </rule>
        <p><cursor/></p>
    </document>
</value>
