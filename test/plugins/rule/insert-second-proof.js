/** @jsx h */

export default editor => editor.insertProof()

export const input = <value>
    <document>
        <rule type="rule">
            <statement>
                <p><cursor/>Statement</p>
            </statement>
            <proof>
                <p>Proof</p>
            </proof>
            <ruleexample>
                <p>Example</p>
            </ruleexample>
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
            <ruleexample>
                <p>Example</p>
            </ruleexample>
        </rule>
    </document>
</value>
