/** @jsx h */

export const checkSelection = false

export const input = <editor>
    <media>
        <img src="first.png" intendedUse="all"><text /></img>
        <mediaalt>First figure</mediaalt>
    </media>
    <img src="second.png" intendedUse="all"><text /></img>
</editor>

export const output = <editor>
    <figure>
        <media>
            <img src="first.png" intendedUse="all"><text /></img>
            <mediaalt>First figure</mediaalt>
        </media>
    </figure>
    <figure>
        <media>
            <img src="second.png" intendedUse="all"><text /></img>
            <mediaalt><text/></mediaalt>
        </media>
    </figure>
</editor>
