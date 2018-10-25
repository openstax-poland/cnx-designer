/** @jsx h */

export default change => {
    should.not.exist(change.getActiveFigure(change.value))
    should.not.exist(change.getActiveSubfigure(change.value))

    change.moveToStartOfNode(change.value.document.getNode('first'))
    const first = change.getActiveFigure(change.value)
    should.equal(first, change.value.document.getNode('figure-1'))
    should.equal(change.getActiveSubfigure(change.value), first)

    change.moveToStartOfNode(change.value.document.getNode('second'))
    const second = change.getActiveFigure(change.value)
    should.equal(second, change.value.document.getNode('figure-2'))
    const second_sub = change.getActiveSubfigure(change.value)
    should.equal(second_sub, change.value.document.getNode('figure-3'))

    change.moveToStartOfNode(change.value.document.getNode('third'))
    const third = change.getActiveFigure(change.value)
    should.equal(third, change.value.document.getNode('figure-2'))
    should.equal(change.getActiveSubfigure(change.value), third)
}

export const input = <value>
    <document>
        <p><cursor/>Not a figure</p>
        <figure key="figure-1">
            <media>
                <img src="first.png"><text/></img>
            </media>
            <figcaption key="first">Simple figure</figcaption>
        </figure>
        <figure key="figure-2">
            <figure key="figure-3">
                <media>
                    <img src="second.png"><text/></img>
                </media>
                <figcaption key="second">Nested figure</figcaption>
            </figure>
            <figure>
                <media>
                    <img src="third.png"><text/></img>
                </media>
            </figure>
            <figcaption key="third">Compound figure</figcaption>
        </figure>
    </document>
</value>
