/** @jsx h */

export default change => change.insertFigure({
    mime: 'image/png',
    name: 'first.png',
    alt: 'First picture',
})

export const input = <value>
    <document>
        <p><text><cursor/></text></p>
    </document>
</value>

export const output = <value>
    <document>
        <p><text/></p>
        <figure>
            <media alt="First picture">
                <img src="first.png"><text><cursor/></text></img>
            </media>
        </figure>
    </document>
</value>
