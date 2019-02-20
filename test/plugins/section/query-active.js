/** @jsx h */

export default change => {
    should.not.exist(change.getActiveSection(change.value))
    should.not.exist(change.getActiveSubsection(change.value))

    const top = change.value.document.getNode('s1')
    const nested = change.value.document.getNode('s2')

    change.moveToStartOfNode(change.value.document.getNode('p1'))
    should.equal(change.getActiveSection(change.value), top)
    should.equal(change.getActiveSubsection(change.value), top)

    change.moveToStartOfNode(change.value.document.getNode('t1'))
    should.equal(change.getActiveSection(change.value), top)
    should.equal(change.getActiveSubsection(change.value), nested)
}

export const input = <value>
    <document>
        <p><cursor/>Not a section</p>
        <section key="s1">
            <title>First section</title>
            <p key="p1">Inside first section</p>
            <section key="s2">
                <title key="t1">Second section</title>
                <p>Inside second section</p>
            </section>
        </section>
    </document>
</value>
