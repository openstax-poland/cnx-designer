/** @jsx h */

export const checkSelection = false

export const input = <editor>
    <figure id="f1">
        <media>
            <img src="first.png" intendedUse="all"><text/></img>
            <mediaalt>First figure</mediaalt>
            <mediaalt>Second alt</mediaalt>
        </media>
        <caption>Main figure</caption>
    </figure>
</editor>

export const output = <editor>
    <figure id="f1">
        <media>
            <img src="first.png" intendedUse="all"><text /></img>
            <mediaalt>First figureSecond alt</mediaalt>
        </media>
        <caption>Main figure</caption>
    </figure>
</editor>
