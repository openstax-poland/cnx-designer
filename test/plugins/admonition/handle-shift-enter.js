/** @jsx h */

export default (change, editor) => {
    editor.run('onKeyDown', { key: 'Enter', shiftKey: true })
    editor.run('onKeyDown', { key: 'Enter', shiftKey: true })
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
            <p><text/></p>
            <p><cursor/>note</p>
        </note>
    </document>
</value>
