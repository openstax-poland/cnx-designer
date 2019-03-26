/** @jsx h */

export default change => {
    let node = change.getActiveAdmonition(change.value)
    should.not.exist(node)

    change.moveToStartOfNode(change.value.document.getNode('flat-target'))
    node = change.getActiveAdmonition(change.value)
    should.exist(node)
    node.should.equal(change.value.document.getNode('flat'))

    change.moveToStartOfNode(change.value.document.getNode('nested-target'))
    node = change.getActiveAdmonition(change.value)
    should.exist(node)
    node.should.equal(change.value.document.getNode('nested'))
}

export const input = <value>
    <document>
        <p>Not<cursor/> a note</p>
        <note key="flat">
            <p key="flat-target">Note</p>
        </note>
        <note key="nested">
            <ul>
                <li>
                    <p key="nested-target">Note</p>
                </li>
            </ul>
        </note>
    </document>
</value>
