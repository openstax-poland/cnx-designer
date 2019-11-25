/** @jsx h */

export default editor => {
    should.not.exist(editor.getActiveFigure(editor.value))
    should.not.exist(editor.getActiveSubfigure(editor.value))

    editor.moveToStartOfNode(editor.value.document.getNode('first'))
    const first = editor.getActiveFigure(editor.value)
    should.equal(first, editor.value.document.getNode('figure-1'))
    should.equal(editor.getActiveSubfigure(editor.value), first)

    editor.moveToStartOfNode(editor.value.document.getNode('second'))
    const second = editor.getActiveFigure(editor.value)
    should.equal(second, editor.value.document.getNode('figure-2'))
    const second_sub = editor.getActiveSubfigure(editor.value)
    should.equal(second_sub, editor.value.document.getNode('figure-3'))

    editor.moveToStartOfNode(editor.value.document.getNode('third'))
    const third = editor.getActiveFigure(editor.value)
    should.equal(third, editor.value.document.getNode('figure-2'))
    should.equal(editor.getActiveSubfigure(editor.value), third)
}

export const input = <value>
    <document>
        <p><cursor/>Not a figure</p>
        <figure key="figure-1">
            <media>
                <img src="first.png" mime="image/png"><text/></img>
                <mediaalt><text/></mediaalt>
            </media>
            <figcaption key="first">Simple figure</figcaption>
        </figure>
        <figure key="figure-2">
            <figure key="figure-3">
                <media>
                    <img src="second.png" mime="image/png"><text/></img>
                    <mediaalt><text/></mediaalt>
                </media>
                <figcaption key="second">Nested figure</figcaption>
            </figure>
            <figure>
                <media>
                    <img src="third.png" mime="image/png"><text/></img>
                    <mediaalt><text/></mediaalt>
                </media>
            </figure>
            <figcaption key="third">Compound figure</figcaption>
        </figure>
    </document>
</value>
