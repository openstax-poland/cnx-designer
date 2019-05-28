/** @jsx h */

import { List } from 'immutable'

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

export const outputContent = <value>
    <document>
        <quote key="q1" class={List()}>
            <p>Quotes can contain text</p>
            <ul class={List()}>
                <li>
                    <p>And lists</p>
                </li>
            </ul>
            <p>Quotes can also contain nested quotes</p>
            <quote class={List()}>
                <p>Like so</p>
        </quote>
        </quote>
        <quote key="q2" class={List()}>
            <p>Quotes can have text content</p>
        </quote>
    </document>
</value>
