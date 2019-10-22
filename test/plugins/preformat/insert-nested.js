/** @jsx h */

export default editor => editor.insertBlock('preformat')

export const input = <value>
    <document>
        <preformat>
            <cursor/>Preformat
        </preformat>
    </document>
</value>

export const output = <value>
    <document>
        <preformat>
            <cursor/>
        </preformat>
        <preformat>
            Preformat
        </preformat>
    </document>
</value>
