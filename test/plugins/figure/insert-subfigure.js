/** @jsx h */

export default change => change.insertSubfigure({
    mime: 'image/png',
    name: 'second.png',
})

export const input = <value>
    <document>
        <figure>
            <media>
                <img src="first.png"><text/></img>
            </media>
            <figcaption><cursor/>Caption</figcaption>
        </figure>
    </document>
</value>

export const output = <value>
    <document>
        <figure>
            <figure>
                <media>
                    <img src="first.png"><text/></img>
                </media>
                <figcaption><cursor/>Caption</figcaption>
            </figure>
            <figure>
                <media>
                    <img src="second.png"><text/></img>
                </media>
            </figure>
        </figure>
    </document>
</value>
