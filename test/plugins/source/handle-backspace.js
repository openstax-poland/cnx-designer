/** @jsx h */

export default (change, editor) => {
  editor.run('onKeyDown', { key: 'Backspace' })
  editor.run('onKeyDown', { key: 'Backspace' })
}

export const input = <value>
    <document>
        <p>Before</p>
        <source>
            S<cursor/>ome
            {'\n'}source
        </source>
        <p>After</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Before<cursor/>ome</p>
        <source>
        source
        </source>
        <p>After</p>
    </document>
</value>
