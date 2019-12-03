/** @jsx h */

export default editor => editor.normalize()

export const input = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>Before</p>
                <rule type="rule">
                    <statement>
                        <p>Statement</p>
                    </statement>
                    <proof>
                        <p>Proof</p>
                    </proof>
                </rule>
                <p>After</p>
            </statement>
        </rule>
    </document>
</value>

export const output = <value>
    <document>
        <rule>
            <statement>
                <p>Before</p>
                <p>Statement</p>
                <p>Proof</p>
                <p>After</p>
            </statement>
        </rule>
    </document>
</value>
