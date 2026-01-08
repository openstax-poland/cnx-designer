/** @jsx h */

export const checkSelection = false

export const input = <editor>
    <figure id="f1">
        <media>
            <img src="first.png" intendedUse="all"><text/></img>
            <text>invalid</text>
        </media>
    </figure>
</editor>

export const output = <editor>
    <figure id="f1">
        <media>
            <img src="first.png" intendedUse="all"><text/></img>
            <mediaalt><text/></mediaalt>
        </media>
    </figure>
    <p>invalid</p>
</editor>
