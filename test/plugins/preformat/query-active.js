/** @jsx h */

export default editor => {
    let block = editor.value.startBlock

    should.exist(block)
    block.type.should.not.equal('preformat')

    editor.moveToStartOfNode(editor.value.document.getNode('preformat'))
    block = editor.value.startBlock
    should.exist(block)
    block.type.should.equal('preformat')
}

export const input = <value>
    <document>
        <p>Not<cursor/> a note</p>
        <preformat key="preformat">
            Preformat
        </preformat>
    </document>
</value>
