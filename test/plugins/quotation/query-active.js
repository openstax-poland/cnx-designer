/** @jsx h */

export default change => {
    should.not.exist(change.getActiveQuotation(change.value))

    change.moveToStartOfNode(change.value.document.getNode('first'))
    const first = change.getActiveQuotation(change.value)
    should.equal(first, change.value.document.getNode('quote-1'))

    change.moveToStartOfNode(change.value.document.getNode('second'))
    const second = change.getActiveQuotation(change.value)
    should.equal(second, change.value.document.getNode('quote-2'))

    change.moveToStartOfNode(change.value.document.getNode('third'))
    const third = change.getActiveQuotation(change.value)
    should.equal(third, change.value.document.getNode('quote-3'))
}

export const input = <value>
    <document>
        <p><cursor/>Not a quote</p>
        <quote key="quote-1">
            <p key="first">Simple quote</p>
        </quote>
        <quote key="quote-2">
            <p key="second">Quote with a nested quote</p>
            <quote key="quote-3">
                <p key="third">Nested quote</p>
            </quote>
        </quote>
    </document>
</value>
