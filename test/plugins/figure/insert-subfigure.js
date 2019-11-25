/** @jsx h */

export default editor => editor.insertSubfigure({
    mime: 'image/png',
    name: 'second.png',
    alt: 'Second picture',
})

export const input = <value>
    <document>
        <figure>
            <media alt="First picture">
                <img src="first.png" mime="image/png"><text/></img>
                <mediaalt>First picture</mediaalt>
            </media>
            <figcaption><cursor/>Caption</figcaption>
        </figure>
    </document>
</value>

export const output = <value>
    <document>
        <figure>
            <figure>
                <media alt="First picture">
                    <img src="first.png" mime="image/png"><text/></img>
                    <mediaalt>First picture</mediaalt>
                </media>
                <figcaption><cursor/>Caption</figcaption>
            </figure>
            <figure>
                <media alt="Second picture">
                    <img src="second.png" mime="image/png"><text/></img>
                    <mediaalt>Second picture</mediaalt>
                </media>
            </figure>
        </figure>
    </document>
</value>
