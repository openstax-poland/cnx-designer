/** @jsx h */

export default change => {
    let node = change.getActiveAdmonition(change.value)
    should.not.exist(node)

    change.moveToStartOfNode(change.value.document.getNode('target'))
    node = change.getActiveAdmonition(change.value)
    should.exist(node)
    node.should.equal(change.value.document.getNode('note'))
}

export const input = <value>
    <document>
        <p>Not<cursor/> a note</p>
        <note key="note">
            <p key="target">Note</p>
        </note>
    </document>
</value>
