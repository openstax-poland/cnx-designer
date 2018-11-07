/** @jsx h */

export default change => change.normalize()

export const input = <value>
    <document>
        <figure>
            <figure>
                <media alt="First figure">
                    <img src="first.png"><text/></img>
                </media>
            </figure>
            <figcaption>Caption</figcaption>
            <figure>
                <media alt="Second figure">
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
                <media alt="First figure">
                    <img src="first.png"><text/></img>
                </media>
            </figure>
            <figure>
                <media alt="Second figure">
                    <img src="second.png"><text/></img>
                </media>
            </figure>
            <figcaption>Caption</figcaption>
        </figure>
    </document>
</value>
