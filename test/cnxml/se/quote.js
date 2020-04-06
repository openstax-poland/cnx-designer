/** @jsx h */
/** @jsxFrag 'fragment' */

export const input = <>
    <quote id="q1">
        <p>Quotes can contain text</p>
        <itemlist>
            <li>
                <p>And lists</p>
            </li>
        </itemlist>
        <p>Quotes can also contain nested quotes</p>
        <quote>
            <p>Like so</p>
        </quote>
    </quote>
</>

export const output = cnxml`
<quote id="q1">
    <para>Quotes can contain text</para>
    <list>
        <item>
            <para>And lists</para>
        </item>
    </list>
    <para>Quotes can also contain nested quotes</para>
    <quote>
        <para>Like so</para>
    </quote>
</quote>
`
