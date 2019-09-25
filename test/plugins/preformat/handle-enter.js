/** @jsx h */

export default editor => {
    editor.run('onKeyDown', { key: 'Enter' })
    editor.run('onKeyDown', { key: 'Enter' })
}

export const input = <value>
    <document>
        <preformat>
            Some preformat<cursor/>
        </preformat>
    </document>
</value>

export const output = <value>
    <document>
        <preformat>
            Some preformat
        </preformat>
        <p><cursor/></p>
    </document>
</value>
