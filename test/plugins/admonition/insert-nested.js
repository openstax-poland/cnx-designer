/** @jsx h */

export default editor => editor.insertAdmonition('warning')

export const input = <value>
    <document>
        <tip>
            <p><cursor/>Note</p>
        </tip>
    </document>
</value>

export const output = <value>
    <document>
        <warning>
            <p><cursor/>Note</p>
        </warning>
    </document>
</value>
