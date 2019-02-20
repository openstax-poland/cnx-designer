/** @jsx h */

export default (change, editor) => editor.run('onKeyDown', { key: 'Enter' })

export const input = <value>
    <document>
        <section>
            <title>Sec<cursor/>tion</title>
            <p>Paragraph</p>
        </section>
    </document>
</value>

export const output = <value>
    <document>
        <section>
            <title>Sec</title>
            <p><cursor/>tion</p>
            <p>Paragraph</p>
        </section>
    </document>
</value>
