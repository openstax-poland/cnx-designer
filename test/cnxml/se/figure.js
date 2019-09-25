/** @jsx h */

export const inputContent = <value>
    <document>
        <figure key="f1">
            <media>
                <img src="f1.png"><text/></img>
                <mediaalt>Figure content</mediaalt>
            </media>
            <figcaption>Figure caption</figcaption>
        </figure>
    </document>
</value>

export const output = cnxml`
<figure id="f1">
    <media alt="Figure content">
        <image src="f1.png" />
    </media>
    <caption>Figure caption</caption>
</figure>
`
