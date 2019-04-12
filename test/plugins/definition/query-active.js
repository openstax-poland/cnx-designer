/** @jsx h */

export default change => {
    let node = change.getActiveDefinition(change.value)
    should.not.exist(node)

    change.moveToStartOfNode(change.value.document.getNode('flat-target'))
    node = change.getActiveDefinition(change.value)
    should.exist(node)
    node.should.equal(change.value.document.getNode('flat'))
}

export const input = <value>
    <document>
        <p><cursor/>Not a definition</p>
        <definition key="flat">
            <term><text/></term>
            <meaning>
                <p key="flat-target">Meaning</p>
            </meaning>
        </definition>
    </document>
</value>
