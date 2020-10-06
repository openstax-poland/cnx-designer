/** @jsx h */

import { List } from 'immutable'

export const inputContent = <value>
    <document>
        <ul type="user-input" bulletStyle="a" numberStyle="b" startValue="1">
            <li>
                <p>List items can contain text</p>
            </li>
            <li>
                <p>Or multiple paragraphs</p>
                <p>Like this</p>
            </li>
            <li>
                <ul class={List(['a', 'b'])} markPrefix="1" markSuffix="|" itemSep="*">
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
<list list-type="bulleted" type="user-input" bullet-style="a" number-style="b" start-value="1">
    <item>
        <para>List items can contain text</para>
    </item>
    <item>
        <para>Or multiple paragraphs</para>
        <para>Like this</para>
    </item>
    <item>
        <list class="a b" list-type="bulleted" mark-prefix="1" mark-suffix="|" item-sep="*">
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
