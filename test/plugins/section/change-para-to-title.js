/** @jsx h */

export default editor => editor.setNodeByKey(
    editor.value.startBlock.key, { type: 'title' })

export const input = <value>
    <document>
        <section>
            <title>Section</title>
            <p>Paragraph</p>
            <p><cursor/>Para 1</p>
            <p>Para 2</p>
            <p>Para 3</p>
        </section>
    </document>
</value>

export const output = <value>
    <document>
        <section>
            <title>Section</title>
            <p>Paragraph</p>
        </section>
        <section>
            <title><cursor/>Para 1</title>
            <p>Para 2</p>
            <p>Para 3</p>
        </section>
    </document>
</value>
