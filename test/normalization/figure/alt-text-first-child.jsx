/** @jsx h */

export const checkSelection = false

export const input = <editor>
    <figure id="f1">
        <media>
            <mediaalt>First figure</mediaalt>
            <img src="first.png" intendedUse="all"><text/></img>
        </media>
        <caption>Main figure</caption>
    </figure>
</editor>

export const output = <editor>
    <figure id="f1">
        <media>
            <img src="first.png" intendedUse="all"><text /></img>
            <mediaalt>First figure</mediaalt>
        </media>
        <caption>Main figure</caption>
    </figure>
</editor>
