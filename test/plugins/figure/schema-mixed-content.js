/** @jsx h */

export default change => change.normalize()

export const input = <value>
    <document>
        <figure key="f1">
            <media alt="First figure">
                <img src="first.png"><text/></img>
            </media>
            <figure key="f2">
                <media alt="Second figure">
                    <img src="second.png"><text/></img>
                </media>
                <figcaption>Nested figure</figcaption>
            </figure>
            <figcaption>Main figure</figcaption>
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
                <figcaption>Nested figure</figcaption>
            </figure>
            <figcaption>Main figure</figcaption>
        </figure>
    </document>
</value>

