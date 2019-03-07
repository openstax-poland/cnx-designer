/** @jsx h */

export const input = <value>
    <document>
        <ul>
            <li>
                <p>List items can contain text</p>
            </li>
            <li>
                <p>Or multiple paragraphs</p>
                <p>Like this</p>
            </li>
            <li>
                <ul>
                    <li>
                        <p>Lists can also contain nested lists</p>
                    </li>
                </ul>
            </li>
            <li>
                <ol>
                    <li>
                        <p>And nested lists in different styles</p>
                    </li>
                </ol>
            </li>
        </ul>
    </document>
</value>

export const output = cnxml`
<list list-type="bulleted">
    <item>
        <para>List items can contain text</para>
    </item>
    <item>
        <para>Or multiple paragraphs</para>
        <para>Like this</para>
    </item>
    <item>
        <list list-type="bulleted">
            <item>
                <para>Lists can also contain nested lists</para>
            </item>
        </list>
    </item>
    <item>
        <list list-type="enumerated">
            <item>
                <para>And nested lists in different styles</para>
            </item>
        </list>
    </item>
</list>
`
