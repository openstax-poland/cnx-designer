/** @jsx h */

export default (change, editor) => {
    editor.run('onKeyDown', { key: 'Backspace' })
}

export const input = <value>
    <document>
        <p><text/></p>
        <figure key="target">
            <media alt="First picture">
                <img src="figure.png"><text><cursor/></text></img>
            </media>
        </figure>
    </document>
</value>

export const output = <value>
    <document>
        <p><text><cursor/></text></p>
    </document>
</value>
