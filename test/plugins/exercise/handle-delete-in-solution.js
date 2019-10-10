/** @jsx h */

export default editor => editor.run('onKeyDown', { key: 'Delete' })

export const input = <value>
    <document>
        <exercise>
            <exproblem>
                <p>Problem</p>
            </exproblem>
            <exsolution>
                <p>Solution<cursor/></p>
            </exsolution>
            <excomment>
                <p>Comment</p>
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
