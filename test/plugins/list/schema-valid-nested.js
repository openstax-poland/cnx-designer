/** @jsx h */

export default editor => editor.normalize()

export const input = <value>
    <document>
        <ol>
            <li>
                <ul>
                    <li>
                        <p>List</p>
                    </li>
                </ul>
            </li>
        </ol>
    </document>
</value>

export const output = <value>
    <document>
        <ol>
            <li>
                <ul>
                    <li>
                        <p>List</p>
                    </li>
                </ul>
            </li>
        </ol>
    </document>
</value>
