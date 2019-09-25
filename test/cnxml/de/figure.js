/** @jsx h */

import { List } from 'immutable'

export const input = cnxml`
<figure id="f1">
    <media alt="Figure content">
        <image src="f1.png" />
    </media>
    <caption>Figure caption</caption>
</figure>
`

export const outputContent = <value>
    <document>
        <figure key="f1" class={List()}>
            <media alt="Figure content">
                <img src="f1.png"><text/></img>
                <mediaalt>Figure content</mediaalt>
            </media>
            <figcaption>Figure caption</figcaption>
        </figure>
    </document>
</value>
