/** @jsx h */

export default editor => {
    editor.run('onKeyDown', { key: 'Enter' })
    editor.run('onKeyDown', { key: 'Enter' })
}

export const input = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>Statement<cursor/></p>
            </statement>
        </rule>
    </document>
</value>

export const output = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>Statement</p>
            </statement>
            <statement>
                <p><cursor/></p>
            </statement>
        </rule>
    </document>
</value>
