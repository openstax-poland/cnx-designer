/** @jsx h */

export default editor => {
    editor.run('onKeyDown', { key: 'Enter' })
    editor.run('onKeyDown', { key: 'Enter' })
}

export const input = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>State<cursor/>ment</p>
            </statement>
            <proof>
                <p>Proof</p>
            </proof>
        </rule>
    </document>
</value>

export const output = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>State</p>
            </statement>
            <statement>
                <p><cursor/>ment</p>
            </statement>
            <proof>
                <p>Proof</p>
            </proof>
        </rule>
    </document>
</value>
