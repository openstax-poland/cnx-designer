/** @jsx h */

export default editor => editor.normalize()

export const input = <value>
    <document>
        <rule type="rule">Bare text</rule>
        <rule type="rule">
            <statement>
                <p>Statement</p>
            </statement>
            <p>First bad child</p>
            <proof>
                <p>Proof</p>
            </proof>
            <p>Second bad child</p>
            <ruleexample>
                <p>Example</p>
            </ruleexample>
            <p>Third bad child</p>
        </rule>
    </document>
</value>

export const output = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>Statement</p>
                <p>First bad child</p>
            </statement>
            <proof>
                <p>Proof</p>
                <p>Second bad child</p>
            </proof>
            <ruleexample>
                <p>Example</p>
                <p>Third bad child</p>
            </ruleexample>
        </rule>
    </document>
</value>
