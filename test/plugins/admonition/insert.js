/** @jsx h */

export default editor => editor.insertAdmonition('tip')

export const input = <value>
    <document>
        <p><cursor/>Some note</p>
    </document>
</value>

export const output = <value>
    <document>
        <tip>
            <p><cursor/>Some note</p>
        </tip>
    </document>
</value>
