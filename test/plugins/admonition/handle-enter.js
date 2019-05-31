/** @jsx h */

export default editor => {
    editor.run('onKeyDown', { key: 'Enter' })
    editor.run('onKeyDown', { key: 'Enter' })
}

export const input = <value>
    <document>
        <note>
            <p>Some<anchor/> <focus/>note</p>
        </note>
    </document>
</value>

export const output = <value>
    <document>
        <note>
            <p>Some</p>
        </note>
        <p><cursor/>note</p>
    </document>
</value>
