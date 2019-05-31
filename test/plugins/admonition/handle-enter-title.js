/** @jsx h */

export default editor => editor.run('onKeyDown', { key: 'Enter' })

export const input = <value>
    <document>
        <note>
            <title>Title <cursor/>text</title>
            <p>Some note</p>
        </note>
    </document>
</value>

export const output = <value>
    <document>
        <note>
            <title>Title </title>
            <p><cursor/>text</p>
            <p>Some note</p>
        </note>
    </document>
</value>
