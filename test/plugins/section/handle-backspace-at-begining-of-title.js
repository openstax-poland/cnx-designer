/** @jsx h */

export default (change, editor) => editor.run('onKeyDown', { key: 'Backspace' })

export const input = <value>
    <document>
        <section>
            <title>First</title>
            <p>Inside first</p>
        </section>
        <section>
            <title><cursor/>Second</title>
            <p>Inside second</p>
        </section>
    </document>
</value>

export const output = <value>
    <document>
        <section>
            <title>First</title>
            <p>Inside first<cursor/>Second</p>
            <p>Inside second</p>
        </section>
    </document>
</value>
