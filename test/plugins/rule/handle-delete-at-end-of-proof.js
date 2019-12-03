/** @jsx h */

export default editor => {
    editor.run('onKeyDown', { key: 'Delete' })
}

export const input = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>Statement</p>
            </statement>
            <proof>
                <p>Proof<cursor/></p>
            </proof>
        </rule>
        <p>After</p>
    </document>
</value>

export const output = <value>
    <document>
        <rule type="rule">
            <statement>
                <p>Statement</p>
            </statement>
            <proof>
                <p>Proof<cursor/>After</p>
            </proof>
        </rule>
    </document>
</value>
