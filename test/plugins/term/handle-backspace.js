/** @jsx h */

export default editor => {
    editor.run('onKeyDown', { key: 'Backspace' })
    editor.run('onKeyDown', { key: 'Backspace' })
}

export const input = <value>
    <document>
        <p>Before <term>Te<cursor/></term></p>
        <p>After</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Before <cursor/></p>
        <p>After</p>
    </document>
</value>
