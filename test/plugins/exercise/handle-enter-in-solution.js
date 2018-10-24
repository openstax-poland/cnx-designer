/** @jsx h */

export default (change, editor) => {
    editor.event('onKeyDown', { key: 'Enter' })
    editor.event('onKeyDown', { key: 'Enter' })
    change.moveToEndOfBlock()
    editor.event('onKeyDown', { key: 'Enter' })
    editor.event('onKeyDown', { key: 'Enter' })
    editor.event('onKeyDown', { key: 'Enter' })
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
