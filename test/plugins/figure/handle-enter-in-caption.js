/** @jsx h */

export default (change, editor) => {
    editor.run('onKeyDown', { key: 'Enter' })
}

export const input = <value>
    <document>
        <figure>
            <media alt="First picture">
                <img src="first.png"><text/></img>
            </media>
            <figcaption>Cap<cursor/>tion</figcaption>
        </figure>
    </document>
</value>

export const output = <value>
    <document>
        <figure>
            <media alt="First picture">
                <img src="first.png"><text/></img>
            </media>
            <figcaption>Cap</figcaption>
        </figure>
        <p><cursor/>tion</p>
    </document>
</value>
