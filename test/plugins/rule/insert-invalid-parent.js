/** @jsx h */

export default editor => editor.insertRule()

export const input = <value>
    <document>
        <note>
            <p>A note<cursor/></p>
        </note>
    </document>
</value>

export const output = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>A note<cursor/></p>
            </statement>
        </rule>
    </document>
</value>
