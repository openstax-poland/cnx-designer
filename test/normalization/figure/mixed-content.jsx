/** @jsx h */

export const checkSelection = false

export const input = <editor>
    <figure id="f1">
        <media>
            <img src="first.png" intendedUse="all"><text/></img>
            <mediaalt>First figure</mediaalt>
        </media>
        <figure id="f2">
            <media>
                <img src="second.png" intendedUse="all"><text/></img>
                <mediaalt>Nested figure</mediaalt>
            </media>
            <caption>Nested figure</caption>
        </figure>
        <caption>Main figure</caption>
    </figure>
</editor>

export const output = <editor>
    <figure id="f1">
        <figure>
            <media>
                <img src="first.png" intendedUse="all"><text/></img>
                <mediaalt>First figure</mediaalt>
            </media>
        </figure>
        <figure id="f2">
            <media>
                <img src="second.png" intendedUse="all"><text/></img>
                <mediaalt>Nested figure</mediaalt>
            </media>
            <caption>Nested figure</caption>
        </figure>
        <caption>Main figure</caption>
    </figure>
</editor>
