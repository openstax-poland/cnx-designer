/** @jsx h */

export default editor => {
    let node = editor.getActiveRule(editor.value)
    should.not.exist(node)

    editor.moveToStartOfNode(editor.value.document.getNode('flat-target'))
    node = editor.getActiveRule(editor.value)
    should.exist(node)
    node.should.equal(editor.value.document.getNode('flat'))

    editor.moveToStartOfNode(editor.value.document.getNode('nested-target'))
    node = editor.getActiveRule(editor.value)
    should.exist(node)
    node.should.equal(editor.value.document.getNode('nested'))
}

export const input = <value>
    <document>
        <p><cursor/>Not an rule</p>
        <rule key="flat" type="rule">
            <statement>
                <p key="flat-target">Rule</p>
            </statement>
        </rule>
        <rule key="nested" type="rule">
            <statement>
                <ul>
                    <li>
                        <p key="nested-target">Rule</p>
                    </li>
                </ul>
            </statement>
        </rule>
    </document>
</value>
