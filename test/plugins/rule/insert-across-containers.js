/** @jsx h */

export default editor => editor.insertRule()

export const input = <value>
    <document>
        <ul>
            <li>
                <p>First list</p>
            </li>
            <li>
                <p>It has two <anchor/>items</p>
            </li>
        </ul>
        <p>Paragraph between lists</p>
        <ol>
            <li>
                <p>Second<focus/> list</p>
            </li>
            <li>
                <p>It also has two items</p>
            </li>
        </ol>
    </document>
</value>

export const output = <value>
    <document>
        <ul>
            <li>
                <p>First list</p>
            </li>
        </ul>
        <rule type="rule">
            <statement>
                <ul>
                    <li>
                        <p>It has two <anchor/>items</p>
                    </li>
                </ul>
                <p>Paragraph between lists</p>
                <ol>
                    <li>
                        <p>Second<focus/> list</p>
                    </li>
                </ol>
            </statement>
        </rule>
        <ol>
            <li>
                <p>It also has two items</p>
            </li>
        </ol>
    </document>
</value>
