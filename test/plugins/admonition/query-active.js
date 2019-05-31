/** @jsx h */

export default editor => {
    let node = editor.getActiveAdmonition(editor.value)
    should.not.exist(node)

    editor.moveToStartOfNode(editor.value.document.getNode('flat-target'))
    node = editor.getActiveAdmonition(editor.value)
    should.exist(node)
    node.should.equal(editor.value.document.getNode('flat'))

    editor.moveToStartOfNode(editor.value.document.getNode('nested-target'))
    node = editor.getActiveAdmonition(editor.value)
    should.exist(node)
    node.should.equal(editor.value.document.getNode('nested'))
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
