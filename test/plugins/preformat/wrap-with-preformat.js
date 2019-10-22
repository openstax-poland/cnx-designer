/** @jsx h */

export default editor => {
    const { value: { selection: { anchor } } } = editor

    editor.moveToFocus()
        .splitBlock()
        .moveTo(anchor.path, anchor.offset)
        .splitBlock()
        .setNodeByKey(editor.value.startBlock.key, 'preformat')
}

export const input = <value>
    <document>
        <p>Some <anchor/>text is<focus/> here</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Some </p>
        <preformat>
            <cursor/>text is
        </preformat>
        <p> here</p>
    </document>
</value>
