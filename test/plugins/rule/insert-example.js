/** @jsx h */

export default editor => editor.insertRuleExample()

export const input = <value>
    <document>
        <rule type="rule">
            <statement>
                <p><cursor/>Statement</p>
            </statement>
        </rule>
    </document>
</value>

export const output = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>Statement</p>
            </statement>
            <ruleexample>
                <p><cursor/></p>
            </ruleexample>
        </rule>
    </document>
</value>
