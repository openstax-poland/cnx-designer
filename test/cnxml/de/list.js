/** @jsx h */

export const input = cnxml`
<list>
    <item>List items can contain text</item>
    <item>
        <para>Items can also contain block nodes</para>
    </item>
    <item>
        <list>
            <item>Or nested lists</item>
        </list>
    </item>
</list>
`

export const output = <value>
    <document>
        <ul>
            <li>
                <p>List items can contain text</p>
            </li>
            <li>
                <p>Items can also contain block nodes</p>
            </li>
            <li>
                <ul>
                    <li>
                        <p>Or nested lists</p>
                    </li>
                </ul>
            </li>
        </ul>
    </document>
</value>
