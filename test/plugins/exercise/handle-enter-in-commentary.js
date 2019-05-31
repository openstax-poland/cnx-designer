/** @jsx h */

export default editor => {
    editor.run('onKeyDown', { key: 'Enter' })
    editor.run('onKeyDown', { key: 'Enter' })
}

export const input = <value>
    <document>
        <exercise>
            <exproblem>
                <p>Problem</p>
            </exproblem>
            <excomment>
                <p>Com<cursor/>ment</p>
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
            <excomment>
                <p>Com</p>
            </excomment>
        </exercise>
        <p><cursor/>ment</p>
    </document>
</value>
