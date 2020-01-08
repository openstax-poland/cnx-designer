/** @jsx h */

export default editor => editor.run('onKeyDown', { key: 'Delete' })

export const input = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>Statement<cursor/></p>
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
                <p>Statement<cursor/>Proof</p>
            </statement>
        </rule>
    </document>
</value>
