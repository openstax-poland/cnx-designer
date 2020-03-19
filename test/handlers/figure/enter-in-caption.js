/** @jsx h */

export default input => input.break()

// Re-enable after porting figure implementation from #3
export const skip = true

export const input = <editor>
    <figure>
        <media alt="First picture">
            <img src="first.png" mime="image/png"><text/></img>
            <mediaalt>First picture</mediaalt>
        </media>
        <caption>Cap<cursor/>tion</caption>
    </figure>
</editor>

export const output = <editor>
    <figure>
        <media alt="First picture">
            <img src="first.png" mime="image/png"><text/></img>
            <mediaalt>First picture</mediaalt>
        </media>
        <caption>Cap</caption>
    </figure>
    <p><cursor/>tion</p>
</editor>
