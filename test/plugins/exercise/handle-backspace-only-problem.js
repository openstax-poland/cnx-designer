/** @jsx h */

export default (change, editor) => {
  editor.event('onKeyDown', { key: 'Backspace' })
}

export const input = <value>
    <document>
        <p>Before</p>
        <exercise>
            <exproblem>
                <p><cursor/>Exercise</p>
            </exproblem>
        </exercise>
        <p>After</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Before<cursor/>Exercise</p>
        <p>After</p>
    </document>
</value>
