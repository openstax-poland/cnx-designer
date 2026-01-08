/** @jsx h */

export default input => input.break()

export const input = <editor>
    <figure>
        <media>
            <img src="first.png" intendedUse="all"><text/></img>
            <mediaalt>First picture</mediaalt>
        </media>
        <caption>Caption<cursor/></caption>
    </figure>
</editor>

export const output = <editor>
    <figure>
        <media>
            <img src="first.png" intendedUse="all"><text/></img>
            <mediaalt>First picture</mediaalt>
        </media>
        <caption>Caption</caption>
    </figure>
    <p><cursor/></p>
</editor>
