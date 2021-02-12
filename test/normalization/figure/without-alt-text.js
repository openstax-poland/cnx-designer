/** @jsx h */

export const checkSelection = false

export const input = <editor>
    <figure id="f1">
        <media>
            <img src="first.png" intendedUse="all"><text/></img>
        </media>
        <caption>Main figure</caption>
    </figure>
</editor>

export const output = <editor>
    <figure id="f1">
        <media>
            <img src="first.png" intendedUse="all"><text /></img>
            <mediaalt><text/></mediaalt>
        </media>
        <caption>Main figure</caption>
    </figure>
</editor>
