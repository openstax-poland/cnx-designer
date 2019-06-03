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
                <p>Commentary<cursor/></p>
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
                <p>Commentary</p>
            </excomment>
        </exercise>
        <p><cursor/></p>
    </document>
</value>
