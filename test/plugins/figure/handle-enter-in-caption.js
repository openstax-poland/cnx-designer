/** @jsx h */

export default editor => editor.run('onKeyDown', { key: 'Enter' })

export const input = <value>
    <document>
        <figure>
            <media alt="First picture">
                <img src="first.png" mime="image/png"><text/></img>
                <mediaalt>First picture</mediaalt>
            </media>
            <figcaption>Cap<cursor/>tion</figcaption>
        </figure>
    </document>
</value>

export const output = <value>
    <document>
        <figure>
            <media alt="First picture">
                <img src="first.png" mime="image/png"><text/></img>
                <mediaalt>First picture</mediaalt>
            </media>
            <figcaption>Cap</figcaption>
        </figure>
        <p><cursor/>tion</p>
    </document>
</value>
