/** @jsx h */

export default change => change.normalize()

export const input = <value>
    <document>
        <figure>
            <figcaption>Caption</figcaption>
            <media alt="Figure">
                <img src="figure.png"><text/></img>
            </media>
        </figure>
    </document>
</value>

export const output = <value>
    <document>
        <figure>
            <media alt="Figure">
                <img src="figure.png"><text/></img>
            </media>
            <figcaption>Caption</figcaption>
        </figure>
    </document>
</value>
