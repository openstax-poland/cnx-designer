/** @jsx h */

export default change => {
    let block = change.value.startBlock

    let node = block.type === 'code' ? block : null
    should.not.exist(node)

    change.moveToStartOfNode(change.value.document.getNode('code'))
    block = change.value.startBlock
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
