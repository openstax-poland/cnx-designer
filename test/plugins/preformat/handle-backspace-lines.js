/** @jsx h */

export default editor => editor.run('onKeyDown', { key: 'Backspace' })

export const input = <value>
    <document>
        <p>Before</p>
        <preformat>
            <cursor/>Some preformat
            {'\n'}next line
            {'\n'}another line
        </preformat>
        <p>After</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Before<cursor/>Some preformat</p>
        <preformat>
            next line
            {'\n'}another line
        </preformat>
        <p>After</p>
    </document>
</value>
