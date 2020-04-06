/** @jsx h */
/** @jsxFrag 'fragment' */

export const input = <>
    <itemlist>
        <li>
            <p>List items can contain text</p>
        </li>
        <li>
            <p>Or multiple paragraphs</p>
            <p>Like this</p>
        </li>
        <itemlist>
            <li>
                <p>Lists can also contain nested lists</p>
            </li>
        </itemlist>
        <enumlist>
            <li>
                <p>And nested lists in different styles</p>
            </li>
        </enumlist>
    </itemlist>
</>

export const output = cnxml`
<list>
    <item>
        <para>List items can contain text</para>
    </item>
    <item>
        <para>Or multiple paragraphs</para>
        <para>Like this</para>
    </item>
    <item>
        <list>
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
