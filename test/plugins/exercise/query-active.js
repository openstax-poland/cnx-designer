/** @jsx h */

export default editor => {
    let node = editor.getActiveExercise(editor.value)
    should.not.exist(node)

    editor.moveToStartOfNode(editor.value.document.getNode('flat-target'))
    node = editor.getActiveExercise(editor.value)
    should.exist(node)
    node.should.equal(editor.value.document.getNode('flat'))

    editor.moveToStartOfNode(editor.value.document.getNode('nested-target'))
    node = editor.getActiveExercise(editor.value)
    should.exist(node)
    node.should.equal(editor.value.document.getNode('nested'))
}

export const input = <value>
    <document>
        <p><cursor/>Not an exercise</p>
        <exercise key="flat">
            <exproblem>
                <p key="flat-target">Exercise</p>
            </exproblem>
        </exercise>
        <exercise key="nested">
            <exproblem>
                <ul>
                    <li>
                        <p key="nested-target">Exercise</p>
                    </li>
                </ul>
            </exproblem>
        </exercise>
    </document>
</value>
