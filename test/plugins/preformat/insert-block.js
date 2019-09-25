/** @jsx h */

export default editor => editor.insertBlock({
    type: 'paragraph',
    nodes: [{ object: 'text', text: 'Para' }],
})

export const input = <value>
    <document>
        <p>Some <preformat>preformat</preformat> text</p>
        <preformat>
            Some preformat
            <cursor/>
        </preformat>
    </document>
</value>

export const output = <value>
    <document>
        <p>Some  text</p>
        <preformat>
            Some preformat
        </preformat>
        <p>Para<cursor/></p>
    </document>
</value>
