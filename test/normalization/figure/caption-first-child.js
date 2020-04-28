/** @jsx h */

export const checkSelection = false

export const input = <editor>
    <figure>
        <caption>Caption</caption>
        <media>
            <img src="figure.png" intendedUse="all"><text/></img>
            <mediaalt>Figure</mediaalt>
        </media>
    </figure>
</editor>

export const output = <editor>
    <figure>
        <media>
            <img src="figure.png" intendedUse="all"><text/></img>
            <mediaalt>Figure</mediaalt>
        </media>
        <caption>Caption</caption>
    </figure>
</editor>
