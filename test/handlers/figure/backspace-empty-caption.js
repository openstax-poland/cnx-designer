/** @jsx h */

export default input => input.backspace()

export const input = <editor>
    <figure>
        <media>
            <img src="figure.png" intendedUse="all"><text/></img>
            <mediaalt>First picture</mediaalt>
        </media>
        <caption><cursor/></caption>
    </figure>
</editor>

export const output = <editor>
    <figure>
        <media>
            <img src="figure.png" intendedUse="all"><text/></img>
            <mediaalt>First picture<cursor/></mediaalt>
        </media>
    </figure>
</editor>
