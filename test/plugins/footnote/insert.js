/** @jsx h */

export default editor => editor.insertInline({
    type: 'footnote',
    nodes: [{object: 'text', text: ' '}],
})

export const input = <value>
    <document>
        <p>Text<cursor/></p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Text<footnote> <cursor/></footnote><text/></p>
    </document>
</value>
