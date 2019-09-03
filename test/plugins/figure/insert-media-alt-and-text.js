/** @jsx h */

export default editor => {
    editor.moveToStartOfNode(editor.value.document.getNode('media-1'))
    editor.insertMediaText()
    editor.insertMediaAlt()
}

export const input = <value>
    <document>
        <figure>
            <media key="media-1">
                <img src="first.png"><text/></img>
            </media>
            <figcaption>Caption</figcaption>
        </figure>
    </document>
</value>

export const output = <value>
    <document>
        <figure>
            <media key="media-1">
                <img src="first.png"><text/></img>
                <mediaalt><text/></mediaalt>
                <mediatext><text/></mediatext>
            </media>
            <figcaption>Caption</figcaption>
        </figure>
    </document>
</value>
