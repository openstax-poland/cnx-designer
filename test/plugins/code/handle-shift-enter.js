/** @jsx h */

export default editor => {
    editor.run('onKeyDown', { key: 'Enter', shiftKey: true })
    editor.run('onKeyDown', { key: 'Enter', shiftKey: true })
}

export const input = <value>
    <document>
        <code>
            Some<anchor/> <focus/>code
        </code>
    </document>
</value>


export const output = <value>
    <document>
        <code>
            Some
            {'\n'}
            {'\n'}
            <cursor/>code
        </code>
    </document>
</value>
