/** @jsx h */

export default editor => {
    editor.run('onKeyDown', { key: 'Enter', shiftKey: true })
    editor.run('onKeyDown', { key: 'Enter', shiftKey: true })
}

export const input = <value>
    <document>
        <preformat>
            Some<anchor/> <focus/>preformat
        </preformat>
    </document>
</value>


export const output = <value>
    <document>
        <preformat>
            Some
            {'\n'}
            {'\n'}
            <cursor/>preformat
        </preformat>
    </document>
</value>
