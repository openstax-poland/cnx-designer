/** @jsx h */

export default editor => editor.run('onKeyDown', { key: 'Enter' })

export const input = <value>
    <document>
        <exercise>
            <exproblem>
                <p>Problem</p>
            </exproblem>
            <excomment>
                <p><cursor/>Commentary</p>
                <p>With two paragraphs</p>
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
        </exercise>
        <p><cursor/>Commentary</p>
        <p>With two paragraphs</p>
    </document>
</value>
