/** @jsx h */

export default editor => editor.run('onKeyDown', { key: 'Delete' })

export const input = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>Statement</p>
            </statement>
            <ruleexample>
                <p>Example 1<cursor/></p>
            </ruleexample>
            <ruleexample>
                <p>Example 2</p>
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
                <p>Example 1<cursor/>Example 2</p>
            </ruleexample>
        </rule>
    </document>
</value>
