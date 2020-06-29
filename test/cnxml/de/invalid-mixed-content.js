/** @jsx h */
/** @jsxFrag 'fragment' */

export const input = cnxml`
<list>
    <item>Or mixed text content<para>With paragraph 1</para><para>and paragraph 2</para></item>
</list>
`

export const output = <document>
    <itemlist>
        <li>
            <p>Or mixed text content</p>
            <p>With paragraph 1</p>
            <p>and paragraph 2</p>
        </li>
    </itemlist>
</document>

export const errors = ['text-in-block']
