/** @jsx h */

export const input = cnxml`
<figure id="f1">
    <subfigure id="f1-1">
        <media alt="First subfigure's content">
            <image src="f1.png" />
        </media>
        <caption>First subfigure</caption>
    </subfigure>
    <subfigure id="f1-2">
        <media alt="Second subfigure's content">
            <image src="f2.png" />
        </media>
    </subfigure>
    <caption>Two subfigures</caption>
</figure>
`

export const output = <value>
    <document>
        <figure key="f1">
            <figure key="f1-1">
                <media alt="First subfigure's content">
                    <img src="f1.png"><text/></img>
                </media>
                <figcaption>First subfigure</figcaption>
            </figure>
            <figure key="f1-2">
                <media alt="Second subfigure's content">
                    <img src="f2.png"><text/></img>
                </media>
            </figure>
            <figcaption>Two subfigures</figcaption>
        </figure>
    </document>
</value>
