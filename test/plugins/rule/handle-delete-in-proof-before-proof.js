/** @jsx h */

export default editor => editor.run('onKeyDown', { key: 'Delete' })

export const input = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>Statement</p>
            </statement>
            <proof>
                <p>Proof 1<cursor/></p>
            </proof>
            <proof>
                <p>Proof 2</p>
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
                <p>Proof 1<cursor/>Proof 2</p>
            </proof>
        </rule>
    </document>
</value>
