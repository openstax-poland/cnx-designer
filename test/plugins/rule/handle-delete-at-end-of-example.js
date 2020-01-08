/** @jsx h */

export default editor => {
    editor.run('onKeyDown', { key: 'Delete' })
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
        <p>After</p>
    </document>
</value>

export const output = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>Statement</p>
            </statement>
            <ruleexample>
                <p>Example<cursor/>After</p>
            </ruleexample>
        </rule>
    </document>
</value>
