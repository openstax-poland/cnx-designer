/** @jsx h */

export default editor => {
    editor.run('onKeyDown', { key: 'Enter' })
    editor.run('onKeyDown', { key: 'Enter' })
    editor.moveToEndOfBlock()
    editor.run('onKeyDown', { key: 'Enter' })
    editor.run('onKeyDown', { key: 'Enter' })
    editor.run('onKeyDown', { key: 'Enter' })
}

export const input = <value>
    <document>
        <exercise>
            <exproblem>
                <p>Problem</p>
            </exproblem>
            <exsolution>
                <p>Sol<cursor/>ution</p>
            </exsolution>
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
                <p>Sol</p>
            </exsolution>
            <exsolution>
                <p>ution</p>
            </exsolution>
        </exercise>
        <p><text><cursor/></text></p>
    </document>
</value>
