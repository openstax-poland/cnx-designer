/** @jsx h */

export default editor => {
    editor.run('onKeyDown', { key: 'Enter' })
    editor.run('onKeyDown', { key: 'Enter' })
}

export const input = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>Statement</p>
            </statement>
            <proof>
                <p>Proof<cursor/></p>
            </proof>
        </rule>
    </document>
</value>

export const output = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>Statement</p>
            </statement>
            <proof>
                <p>Proof</p>
            </proof>
            <proof>
                <p><cursor/></p>
            </proof>
        </rule>
    </document>
</value>
