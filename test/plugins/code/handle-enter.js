/** @jsx h */

export default (change, editor) => {
    editor.run('onKeyDown', { key: 'Enter' })
    editor.run('onKeyDown', { key: 'Enter' })
}

export const input = <value>
    <document>
        <code>
            Some code<cursor/>
        </code>
    </document>
</value>

export const output = <value>
    <document>
        <code>
            Some code
        </code>
        <p><cursor/></p>
    </document>
</value>
