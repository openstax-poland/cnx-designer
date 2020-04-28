/** @jsx h */

export const checkSelection = false

export const input = <editor>
    <figure key="f1">
        <figure key="f2">
            <figure key="f3">
                <media>
                    <img src="first.png" intendedUse="all"><text/></img>
                    <mediaalt>First figure</mediaalt>
                </media>
            </figure>
            <figure key="f4">
                <media>
                    <img src="second.png" intendedUse="all"><text/></img>
                    <mediaalt>Second figure</mediaalt>
                </media>
            </figure>
        </figure>
        <figure key="f5">
            <media>
                <img src="third.png" intendedUse="all"><text/></img>
                <mediaalt>Third figure</mediaalt>
            </media>
        </figure>
    </figure>
</editor>


export const output = <editor>
    <figure key="f1">
        <figure key="f3">
            <media>
                <img src="first.png" intendedUse="all"><text/></img>
                <mediaalt>First figure</mediaalt>
            </media>
        </figure>
        <figure key="f4">
            <media>
                <img src="second.png" intendedUse="all"><text/></img>
                <mediaalt>Second figure</mediaalt>
            </media>
        </figure>
        <figure key="f5">
            <media>
                <img src="third.png" intendedUse="all"><text/></img>
                <mediaalt>Third figure</mediaalt>
            </media>
        </figure>
    </figure>
</editor>
