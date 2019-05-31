/** @jsx h */

export default editor => {
    editor.run('onKeyDown', { key: 'Enter' })
    editor.run('onKeyDown', { key: 'Enter' })
}

export const input = <value>
    <document>
        <exercise>
            <exproblem>
                <p>Pro<cursor/>blem</p>
            </exproblem>
            <exsolution>
                <p>Solution</p>
            </exsolution>
        </exercise>
    </document>
</value>

export const output = <value>
    <document>
        <exercise>
            <exproblem>
                <p>Pro</p>
            </exproblem>
            <exsolution>
                <p><cursor/>blem</p>
            </exsolution>
            <exsolution>
                <p>Solution</p>
            </exsolution>
        </exercise>
    </document>
</value>
