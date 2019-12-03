/** @jsx h */

export default editor => {
    editor.run('onKeyDown', { key: 'Delete' })
}

export const input = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>Statement<cursor/></p>
            </statement>
        </rule>
        <p>After</p>
    </document>
</value>

export const output = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>Statement<cursor/>After</p>
            </statement>
        </rule>
    </document>
</value>
