/** @jsx h */

export default editor => editor.run('onKeyDown', { key: 'Backspace' })

export const input = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>Statement 1</p>
            </statement>
            <statement>
                <p><cursor/>Statement 2</p>
            </statement>
        </rule>
    </document>
</value>

export const output = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>Statement 1<cursor/>Statement 2</p>
            </statement>
        </rule>
    </document>
</value>
