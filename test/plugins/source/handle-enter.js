/** @jsx h */

export default (change, editor) => {
    editor.run('onKeyDown', { key: 'Enter' })
    editor.run('onKeyDown', { key: 'Enter' })
}

export const input = <value>
    <document>
        <source>
            Some source<cursor/>
        </source>
    </document>
</value>

export const output = <value>
    <document>
        <source>
            Some source
        </source>
        <p><cursor/></p>
    </document>
</value>
