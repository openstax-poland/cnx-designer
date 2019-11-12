/** @jsx h */

import { List } from 'immutable'

export const input = cnxml`
<figure id="f1">
    <media alt="Figure content">
        <image src="f1.png" mime-type="image/png" />
    </media>
    <caption>Figure caption</caption>
</figure>
<figure id="f2">
    <media alt="Audio alt text">
        <audio src="f2.wav" mime-type="audio/x-wav" />
    </media>
</figure>
<figure id="f3">
    <media alt="Video alt text">
        <video src="f3.mpg" mime-type="video/mpeg" />
    </media>
</figure>
`

export const outputContent = <value>
    <document>
        <figure key="f1" class={List()}>
            <media alt="Figure content">
                <img src="f1.png" mime="image/png"><text/></img>
                <mediaalt>Figure content</mediaalt>
            </media>
            <figcaption>Figure caption</figcaption>
        </figure>
        <figure key="f2" class={List()}>
            <media alt="Audio alt text">
                <audio src="f2.wav" mime="audio/x-wav"><text/></audio>
                <mediaalt>Audio alt text</mediaalt>
            </media>
        </figure>
        <figure key="f3" class={List()}>
            <media alt="Video alt text">
                <video src="f3.mpg" mime="video/mpeg"><text/></video>
                <mediaalt>Video alt text</mediaalt>
            </media>
        </figure>
    </document>
</value>
