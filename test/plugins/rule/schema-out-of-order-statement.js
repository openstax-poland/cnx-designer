/** @jsx h */

export default editor => editor.normalize()

export const checkSelection = false

export const input = <value>
    <document>
        <rule type="rule">
            <proof>
                <p>Missing proof</p>
            </proof>
            <statement>
                <p>Out of order</p>
            </statement>
        </rule>
    </document>
</value>

export const output = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>Out of order</p>
            </statement>
            <proof>
                <p>Missing proof</p>
            </proof>
        </rule>
    </document>
</value>
