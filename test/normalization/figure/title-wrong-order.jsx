/** @jsx h */

export const checkSelection = false

export const input = <editor>
    <figure>
        <media>
            <img src="figure.png" intendedUse="all"><text/></img>
            <mediaalt>Figure</mediaalt>
        </media>
        <title>Title</title>
        <title>Title2</title>
        <caption>Caption</caption>
    </figure>
</editor>

export const output = <editor>
    <figure>
        <title>TitleTitle2</title>
        <media>
            <img src="figure.png" intendedUse="all"><text/></img>
            <mediaalt>Figure</mediaalt>
        </media>
        <caption>Caption</caption>
    </figure>
</editor>
