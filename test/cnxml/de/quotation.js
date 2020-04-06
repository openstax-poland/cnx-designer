/** @jsx h */
/** @jsxFrag 'fragment' */

export const input = cnxml`
<quote id="q1">
    <para>Quotes can contain text</para>
    <list>
        <item>And lists</item>
    </list>
    <para>Quotes can also contain nested quotes</para>
    <quote>
        <para>Like so</para>
    </quote>
</quote>
<quote id="q2">Quotes can have text content</quote>
`

export const output = <document>
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
    <quote id="q2">
        <p>Quotes can have text content</p>
    </quote>
</document>
