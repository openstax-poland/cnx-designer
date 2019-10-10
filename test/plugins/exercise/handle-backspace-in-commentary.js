/** @jsx h */

export default editor => editor.run('onKeyDown', { key: 'Backspace' })

export const input = <value>
    <document>
        <exercise>
            <exproblem>
                <p>Problem</p>
            </exproblem>
            <exsolution>
                <p>Solution</p>
            </exsolution>
            <excomment>
                <p><cursor/>Comment</p>
            </excomment>
        </exercise>
    </document>
</value>

export const output = <value>
    <document>
        <exercise>
            <exproblem>
                <p>Problem</p>
            </exproblem>
            <exsolution>
                <p>Solution<cursor/>Comment</p>
            </exsolution>
        </exercise>
    </document>
</value>
