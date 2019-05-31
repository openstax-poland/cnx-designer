/** @jsx h */

export default editor => editor.run('onKeyDown', { key: 'Enter' })

export const input = <value>
    <document>
        <section>
            <title>Te<cursor/>st</title>
            <p><text/></p>
        </section>
    </document>
</value>

export const output = <value>
    <document>
        <section>
            <title>Te</title>
            <p><cursor/>st</p>
            <p><text/></p>
        </section>
    </document>
</value>
