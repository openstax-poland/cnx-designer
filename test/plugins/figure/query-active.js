/** @jsx h */

export const skip = true

export default change => {
    let node = change.getActiveFigure(change.value)
    should.not.exist(node)

    change.moveToStartOfNode(change.value.document.getNode('first'))
    node = change.getActiveFigure(change.value)
    should.exist(node)
    node.should.equal(change.value.document.getNode('figure-1'))

    change.moveToStartOfNode(change.value.document.getNode('second'))
    node = change.getActiveFigure(change.value)
    should.exist(node)
    node.should.equal(change.value.document.getNode('figure-2'))
}

export const input = <value>
    <document>
        <p><cursor/>Not a figure</p>
        <figure key="figure-1">
            <media>
                <img src="first.png"><text/></img>
            </media>
            <figcaption key="first">First figure</figcaption>
        </figure>
        <figure key="figure-2">
            <figure>
                <media>
                    <img src="second.png"><text/></img>
                </media>
                <figcaption key="second">Second figure</figcaption>
            </figure>
            <figure>
                <media>
                    <img src="second.png"><text/></img>
                </media>
            </figure>
        </figure>
    </document>
</value>
