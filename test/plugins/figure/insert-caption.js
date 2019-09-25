/** @jsx h */

export default editor => editor.insertCaption()

export const input = <value>
    <document>
        <figure>
            <media alt="First picture">
                <img src="first.png"><text><cursor/></text></img>
                <mediaalt>First picture</mediaalt>
            </media>
        </figure>
    </document>
</value>

export const output = <value>
    <document>
        <figure>
            <media alt="First picture">
                <img src="first.png"><text/></img>
                <mediaalt>First picture</mediaalt>
            </media>
            <figcaption><text><cursor/></text></figcaption>
        </figure>
    </document>
</value>
