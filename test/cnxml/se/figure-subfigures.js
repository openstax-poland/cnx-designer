/** @jsx h */

export const inputContent = <value>
    <document>
        <figure key="f1">
            <figure key="f1-1">
                <media>
                    <img src="f1.png" mime="image/png"><text/></img>
                    <mediaalt>First subfigure&apos;s content</mediaalt>
                </media>
                <figcaption>First subfigure</figcaption>
            </figure>
            <figure key="f1-2">
                <media>
                    <img src="f2.png" mime="image/png"><text/></img>
                    <mediaalt>Second subfigure&apos;s content</mediaalt>
                </media>
            </figure>
            <figcaption>Two subfigures</figcaption>
        </figure>
    </document>
</value>

export const output = cnxml`
<figure id="f1">
    <subfigure id="f1-1">
        <media alt="First subfigure's content">
            <image src="f1.png" mime-type="image/png"/>
        </media>
        <caption>First subfigure</caption>
    </subfigure>
    <subfigure id="f1-2">
        <media alt="Second subfigure's content">
            <image src="f2.png" mime-type="image/png"/>
        </media>
    </subfigure>
    <caption>Two subfigures</caption>
</figure>
`
