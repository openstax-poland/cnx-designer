/** @jsx h */

export default editor => editor.decreaseSectionDepth()

export const input = <value>
    <document>
        <section>
            <title>Test</title>
            <p><cursor/>Paragraph</p>
        </section>
    </document>
</value>

export const output = <value>
    <document>
        <section>
            <title>Test</title>
            <p><cursor/>Paragraph</p>
        </section>
    </document>
</value>
