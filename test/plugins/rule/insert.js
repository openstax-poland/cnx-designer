/** @jsx h */

export default editor => editor.insertRule()

export const input = <value>
    <document>
        <p><cursor/>Rule</p>
    </document>
</value>

export const output = <value>
    <document>
        <rule type="rule">
            <statement>
                <p><cursor/>Rule</p>
            </statement>
        </rule>
    </document>
</value>
