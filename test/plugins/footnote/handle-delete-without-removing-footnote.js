/** @jsx h */

export default editor => {
    editor.run('onKeyDown', { key: 'Delete' })
    editor.run('onKeyDown', { key: 'Delete' })
    editor.run('onKeyDown', { key: 'Delete' })
}

export const input = <value>
    <document>
        <p>Before <footnote>Footno<cursor/>te</footnote><text/></p>
        <p>After</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Before <footnote>Footno<cursor/></footnote>fter</p>
    </document>
</value>
