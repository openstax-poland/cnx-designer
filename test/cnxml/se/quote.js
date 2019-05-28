/** @jsx h */

export const inputContent = <value>
    <document>
        <quote key="q1">
            <p>Quotes can contain text</p>
            <ul>
                <li>
                    <p>And lists</p>
                </li>
            </ul>
            <p>Quotes can also contain nested quotes</p>
            <quote>
                <p>Like so</p>
        </quote>
        </quote>
    </document>
</value>

export const output = cnxml`
<quote id="q1">
    <para>Quotes can contain text</para>
    <list list-type="bulleted">
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
