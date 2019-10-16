/** @jsx h */

export default editor => editor.normalize()

export const input = <value>
    <document>
        <ol>
            <li>
                <p>List</p>
                <note><p>Note</p></note>
            </li>
        </ol>
        <ul>
            <li>
                <p>List</p>
                <note><p>Note</p></note>
            </li>
        </ul>
    </document>
</value>

export const output = <value>
    <document>
        <ol>
            <li>
                <p>List</p>
            </li>
        </ol>
        <note><p>Note</p></note>
        <ul>
            <li>
                <p>List</p>
            </li>
        </ul>
        <note><p>Note</p></note>
    </document>
</value>
