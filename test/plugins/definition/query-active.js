/** @jsx h */

export default editor => {
    editor.moveToStartOfNode(editor.value.document.getNode('flat-target'))
    let node = editor.getActiveDefinition(editor.value)
    should.exist(node)
    node.should.equal(editor.value.document.getNode('flat'))

    editor.moveToStartOfNode(editor.value.document.getNode('nested-target'))
    node = editor.getActiveDefinition(editor.value)
    should.exist(node)
    node.should.equal(editor.value.document.getNode('nested'))
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
