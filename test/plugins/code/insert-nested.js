/** @jsx h */

export default editor => editor.insertBlock('code')

export const input = <value>
    <document>
        <code>
            <cursor/>Code
        </code>
    </document>
</value>

export const output = <value>
    <document>
        <code>
            <cursor/>
        </code>
        <code>
            Code
        </code>
    </document>
</value>
