/** @jsx h */

export default editor => {
    editor.run('onKeyDown', { key: 'Enter', shiftKey: true })
    editor.run('onKeyDown', { key: 'Enter', shiftKey: true })
}

export const input = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>State<cursor/>ment</p>
            </statement>
        </rule>
    </document>
</value>

export const output = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>State</p>
                <p><text/></p>
                <p><cursor/>ment</p>
            </statement>
        </rule>
    </document>
</value>
