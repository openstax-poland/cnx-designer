/** @jsx h */

export default (change, editor) => {
    editor.run('onKeyDown', { key: 'Enter' })
    change.moveToStartOfNode(change.value.document.getNode('solution'))
    editor.run('onKeyDown', { key: 'Enter' })
    change.moveToStartOfNode(change.value.document.getNode('problem'))
    editor.run('onKeyDown', { key: 'Enter' })
}

export const input = <value>
    <document>
        <exercise>
            <exproblem key="problem">
                <p>Problem</p>
            </exproblem>
            <exsolution key="solution">
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
        <p><cursor/>Problem</p>
        <p>Solution</p>
        <p>Comment</p>
    </document>
</value>
