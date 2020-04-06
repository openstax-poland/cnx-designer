/** @jsx h */
/** @jsxFrag 'fragment' */

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

export const output = <document>
    <itemlist>
        <li>
            <p>List items can contain text</p>
        </li>
        <li>
            <p>Items can also contain block nodes</p>
        </li>
        <itemlist>
            <li>
                <p>Or nested lists</p>
            </li>
        </itemlist>
    </itemlist>
</document>
