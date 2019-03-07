/** @jsx h */

export default (change, editor) => {
    editor.run('onKeyDown', { key: 'Enter', shiftKey: true })
    editor.run('onKeyDown', { key: 'Enter', shiftKey: true })
}

export const input = <value>
    <document>
        <quote>
            <p>Some<anchor/> <focus/>quote</p>
        </quote>
    </document>
</value>


export const output = <value>
    <document>
        <quote>
            <p>Some</p>
            <p><text/></p>
            <p><cursor/>quote</p>
        </quote>
    </document>
</value>
