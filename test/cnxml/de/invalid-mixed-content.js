/** @jsx h */

import { List } from 'immutable'

export const input = cnxml`
<list>
    <item>Or mixed text content<para>With paragraph 1</para><para>and paragraph 2</para></item>
</list>
`

export const outputContent = <value>
    <document>
        <ul class={List()}>
            <li>
                <p>Or mixed text content</p>
                <p>With paragraph 1</p>
                <p>and paragraph 2</p>
            </li>
        </ul>
    </document>
</value>
