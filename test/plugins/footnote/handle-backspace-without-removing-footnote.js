/** @jsx h */

export default editor => {
  editor.run('onKeyDown', { key: 'Backspace' })
  editor.run('onKeyDown', { key: 'Backspace' })
  editor.run('onKeyDown', { key: 'Backspace' })
}

export const input = <value>
    <document>
        <p>Before <footnote>Fo<cursor/>otnote</footnote><text/></p>
        <p>After</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Before<footnote><cursor/>otnote</footnote><text/></p>
        <p>After</p>
    </document>
</value>
