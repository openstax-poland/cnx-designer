/** @jsx h */

export default editor => editor.run('onKeyDown', { key: 'Delete' })

export const input = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>Statement 1<cursor/></p>
            </statement>
            <statement>
                <p>Statement 2</p>
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
