/** @jsx h */
/** @jsxFrag 'fragment' */

export const input = <>
    <figure id="f1">
        <figure id="f1-1">
            <media>
                <img src="f1.png" intendedUse="all"><text/></img>
                <mediaalt>First subfigure&apos;s content</mediaalt>
            </media>
            <caption>First subfigure</caption>
        </figure>
        <figure id="f1-2">
            <media>
                <img src="f2.png" intendedUse="all"><text/></img>
                <mediaalt>Second subfigure&apos;s content</mediaalt>
            </media>
        </figure>
        <caption>Two subfigures</caption>
    </figure>
</>

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
