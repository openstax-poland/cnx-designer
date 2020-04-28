/** @jsx h */

export const checkSelection = false

export const input = <editor>
    <figure id="f1">
        <figure id="f2">
            <media>
                <img src="figure.png" intendedUse="all"><text/></img>
                <mediaalt>Figure</mediaalt>
            </media>
            <caption>Subfigure</caption>
        </figure>
        <caption>Main figure</caption>
    </figure>
</editor>

export const output = <editor>
    <figure id="f1">
        <media>
            <img src="figure.png" intendedUse="all"><text/></img>
            <mediaalt>Figure</mediaalt>
        </media>
        <caption>SubfigureMain figure</caption>
    </figure>
</editor>
