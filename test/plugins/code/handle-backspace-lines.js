/** @jsx h */

export default editor => editor.run('onKeyDown', { key: 'Backspace' })

export const input = <value>
    <document>
        <p>Before</p>
        <code>
            <cursor/>Some code
            {'\n'}next line
            {'\n'}another line
        </code>
        <p>After</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Before<cursor/>Some code</p>
        <code>
            next line
            {'\n'}another line
        </code>
        <p>After</p>
    </document>
</value>
