/** @jsx h */

export default (change, editor) => {
    editor.run('onKeyDown', { key: 'Delete' })
}

export const checkSelection = false

export const input = <value>
    <document>
        <figure>
            <figure>
                <media alt="First picture">
                    <img src="first.png"><text/></img>
                </media>
                <figcaption>First subfigure</figcaption>
            </figure>
            <figure key="target">
                <media alt="Second picture">
                    <img src="second.png"><text><cursor/></text></img>
                </media>
                <figcaption>Second subfigure</figcaption>
            </figure>
            <figcaption>Main figure's caption</figcaption>
        </figure>
    </document>
</value>

export const output = <value>
    <document>
        <figure>
            <media alt="First picture">
                <img src="first.png"><text/></img>
            </media>
            <figcaption>First subfigureMain figure's caption</figcaption>
        </figure>
    </document>
</value>
