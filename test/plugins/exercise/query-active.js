/** @jsx h */

export default change => {
    let node = change.getActiveExercise(change.value)
    should.not.exist(node)

    change.moveToStartOfNode(change.value.document.getNode('flat-target'))
    node = change.getActiveExercise(change.value)
    should.exist(node)
    node.should.equal(change.value.document.getNode('flat'))

    change.moveToStartOfNode(change.value.document.getNode('nested-target'))
    node = change.getActiveExercise(change.value)
    should.exist(node)
    node.should.equal(change.value.document.getNode('nested'))
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
