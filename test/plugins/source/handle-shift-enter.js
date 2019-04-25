/** @jsx h */

export default (change, editor) => {
    editor.run('onKeyDown', { key: 'Enter', shiftKey: true })
    editor.run('onKeyDown', { key: 'Enter', shiftKey: true })
}

export const input = <value>
    <document>
        <source>
            Some<anchor/> <focus/>source
        </source>
    </document>
</value>


export const output = <value>
    <document>
        <source>
            Some
            {'\n'}
            {'\n'}<cursor/>source
        </source>
    </document>
</value>
