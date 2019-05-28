/** @jsx h */

export default change => {
    change.moveToStartOfNode(change.value.document.getNode('flat-target'))
    let node = change.getActiveDefinition(change.value)
    should.exist(node)
    node.should.equal(change.value.document.getNode('flat'))

    change.moveToStartOfNode(change.value.document.getNode('nested-target'))
    node = change.getActiveDefinition(change.value)
    should.exist(node)
    node.should.equal(change.value.document.getNode('nested'))
}

export const input = <value>
    <document>
        <definition key="flat">
            <defterm>Term</defterm>
            <defmeaning>
                <p key="flat-target">Meaning</p>
            </defmeaning>
        </definition>
        <definition key="nested">
            <defterm>Term</defterm>
            <defmeaning>
                <ul>
                    <li>
                        <p key="nested-target">Meaning</p>
                    </li>
                </ul>
            </defmeaning>
        </definition>
    </document>
</value>
