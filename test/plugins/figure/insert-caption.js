/** @jsx h */

export default change => change.insertCaption()

export const input = <value>
    <document>
        <figure>
            <media alt="First picture">
                <img src="first.png"><text><cursor/></text></img>
            </media>
        </figure>
    </document>
</value>

export const output = <value>
    <document>
        <figure>
            <media alt="First picture">
                <img src="first.png"><text/></img>
            </media>
            <figcaption><text><cursor/></text></figcaption>
        </figure>
    </document>
</value>
