/** @jsx h */

export default (change, editor) => {
  editor.event('onKeyDown', { key: 'Backspace' })
}

export const input = <value>
    <document>
        <p>Before</p>
        <tip>
            <p><cursor/>Some note</p>
        </tip>
        <p>After</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Before<cursor/>Some note</p>
        <p>After</p>
    </document>
</value>
