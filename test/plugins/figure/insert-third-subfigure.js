/** @jsx h */

export default editor => editor.insertSubfigure({
    mime: 'image/png',
    name: 'third.png',
    alt: 'Third picture',
})

export const input = <value>
    <document>
        <figure>
            <figure>
                <media alt="First picture">
                    <img src="first.png"><text/></img>
                </media>
                <figcaption><cursor/>Caption</figcaption>
            </figure>
            <figure>
                <media alt="Second picture">
                    <img src="second.png"><text/></img>
                </media>
            </figure>
        </figure>
    </document>
</value>

export const output = <value>
    <document>
        <figure>
            <figure>
                <media alt="First picture">
                    <img src="first.png"><text/></img>
                </media>
                <figcaption><cursor/>Caption</figcaption>
            </figure>
            <figure>
                <media alt="Second picture">
                    <img src="second.png"><text/></img>
                </media>
            </figure>
            <figure>
                <media alt="Third picture">
                    <img src="third.png"><text/></img>
                </media>
            </figure>
        </figure>
    </document>
</value>
