/** @jsx h */

export default editor => editor.insertSection()

export const input = <value>
    <document>
        <p><cursor/>Paragraph</p>
    </document>
</value>

export const output = <value>
    <document>
        <section>
            <title><cursor/></title>
            <p>Paragraph</p>
        </section>
    </document>
</value>
