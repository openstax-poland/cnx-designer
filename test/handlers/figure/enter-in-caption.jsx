/** @jsx h */

export default input => input.break()

export const input = <editor>
    <figure>
        <media>
            <img src="first.png" intendedUse="all"><text/></img>
            <mediaalt>First picture</mediaalt>
        </media>
        <caption>Cap<cursor/>tion</caption>
    </figure>
</editor>

export const output = <editor>
    <figure>
        <media>
            <img src="first.png" intendedUse="all"><text/></img>
            <mediaalt>First picture</mediaalt>
        </media>
        <caption>Cap</caption>
    </figure>
    <p><cursor/>tion</p>
</editor>
