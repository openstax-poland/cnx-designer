/** @jsx h */

export default editor => editor.run('onKeyDown', { key: 'Backspace' })

export const input = <value>
    <document>
        <p>Before</p>
        <exercise>
            <exproblem>
                <p><cursor/>Problem</p>
            </exproblem>
            <exsolution>
                <p>Solution</p>
            </exsolution>
        </exercise>
        <p>After</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Before<cursor/>Problem</p>
        <exercise>
            <exproblem>
                <p><text/></p>
            </exproblem>
            <exsolution>
                <p>Solution</p>
            </exsolution>
        </exercise>
        <p>After</p>
    </document>
</value>

