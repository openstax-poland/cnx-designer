/** @jsx h */

export default editor => editor.insertBlock('definition')

export const input = <value>
    <document>
        <ol>
            <li>
                <p><cursor/>List</p>
            </li>
        </ol>
    </document>
</value>

export const output = <value>
    <document>
        <ol>
            <li>
                <p><cursor/>List</p>
            </li>
        </ol>
    </document>
</value>
