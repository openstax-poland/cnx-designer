/** @jsx h */

import { List } from 'immutable'

export const input = cnxml`
<para id="p1">Some text<list id="l1">
        <item>List item</item>
    </list>More text<figure id="f1">
        <media alt="This should not be inline">
            <image src="f1.png" mime-type="image/png" />
        </media>
    </figure>Even more text</para>
`

export const outputContent = <value>
    <document>
        <p key="p1">Some text</p>
        <ul key="l1" class={List()}>
            <li>
                <p>List item</p>
            </li>
        </ul>
        <p>More text</p>
        <figure key="f1" class={List()}>
            <media alt="This should not be inline">
                <img src="f1.png" mime="image/png"><text/></img>
                <mediaalt>This should not be inline</mediaalt>
            </media>
        </figure>
        <p>Even more text</p>
    </document>
</value>
