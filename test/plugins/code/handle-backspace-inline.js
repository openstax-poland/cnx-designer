/** @jsx h */

export default (change, editor) => {
    editor.run('onKeyDown', { key: 'Backspace' })
    editor.run('onKeyDown', { key: 'Backspace' })
    editor.run('onKeyDown', { key: 'Backspace' })
}

export const input = <value>
    <document>
        <p>Text<codeinline>So<cursor/>me code</codeinline></p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Tex<codeinline><cursor/>me code</codeinline><text/></p>
    </document>
</value>
