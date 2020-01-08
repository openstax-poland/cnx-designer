/** @jsx h */

export default editor => editor.normalize()

export const input = <value>
    <document>
        <statement>
            <p>Statement</p>
        </statement>
        <proof>
            <p>Proof</p>
        </proof>
        <ruleexample>
            <p>Example</p>
        </ruleexample>
    </document>
</value>

export const output = <value>
    <document>
        <p>Statement</p>
        <p>Proof</p>
        <p>Example</p>
    </document>
</value>
