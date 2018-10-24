/** @jsx h */

export default change => {
    let node = change.getActiveExercise(change.value)
    should.not.exist(node)

    change.moveToStartOfNode(change.value.document.getNode('target'))
    node = change.getActiveExercise(change.value)
    should.exist(node)
    node.should.equal(change.value.document.getNode('exercise'))
}

export const input = <value>
    <document>
        <p><cursor/>Not an exercise</p>
        <exercise key="exercise">
            <exproblem>
                <p key="target">Exercise</p>
            </exproblem>
        </exercise>
    </document>
</value>
