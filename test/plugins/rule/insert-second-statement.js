/** @jsx h */

export default editor => editor.insertStatement()

export const input = <value>
    <document>
        <rule type="rule">
            <statement>
                <p><cursor/>Statement</p>
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
                <p>Statement</p>
            </statement>
            <statement>
                <p><cursor/></p>
            </statement>
            <proof>
                <p>Proof</p>
            </proof>
        </rule>
    </document>
</value>
