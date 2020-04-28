/** @jsx h */

export const checkSelection = false

export const input = <editor>
    <figure>
        <figure>
            <media>
                <img src="first.png" intendedUse="all"><text/></img>
                <mediaalt>First figure</mediaalt>
            </media>
        </figure>
        <caption>Caption</caption>
        <figure>
            <media>
                <img src="second.png" intendedUse="all"><text/></img>
                <mediaalt>Second figure</mediaalt>
            </media>
        </figure>
    </figure>
</editor>

export const output = <editor>
    <figure>
        <figure>
            <media>
                <img src="first.png" intendedUse="all"><text/></img>
                <mediaalt>First figure</mediaalt>
            </media>
        </figure>
        <figure>
            <media>
                <img src="second.png" intendedUse="all"><text/></img>
                <mediaalt>Second figure</mediaalt>
            </media>
        </figure>
        <caption>Caption</caption>
    </figure>
</editor>
