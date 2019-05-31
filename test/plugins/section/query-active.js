/** @jsx h */

export default editor => {
    should.not.exist(editor.getActiveSection(editor.value))
    should.not.exist(editor.getActiveSubsection(editor.value))

    const top = editor.value.document.getNode('s1')
    const nested = editor.value.document.getNode('s2')

    editor.moveToStartOfNode(editor.value.document.getNode('p1'))
    should.equal(editor.getActiveSection(editor.value), top)
    should.equal(editor.getActiveSubsection(editor.value), top)

    editor.moveToStartOfNode(editor.value.document.getNode('t1'))
    should.equal(editor.getActiveSection(editor.value), top)
    should.equal(editor.getActiveSubsection(editor.value), nested)
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
