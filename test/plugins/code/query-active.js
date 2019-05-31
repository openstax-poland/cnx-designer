/** @jsx h */

export default editor => {
    let block = editor.value.startBlock

    let node = block.type === 'code' ? block : null
    should.not.exist(node)

    editor.moveToStartOfNode(editor.value.document.getNode('code'))
    block = editor.value.startBlock
    node = block.type === 'code' ? block : null
    should.exist(node)
}

export const input = <value>
    <document>
        <p>Not<cursor/> a note</p>
        <code key="code">
            Code
        </code>
    </document>
</value>
