/** @jsx h */

export default editor => {
    should.not.exist(editor.getActiveQuotation(editor.value))

    editor.moveToStartOfNode(editor.value.document.getNode('first'))
    const first = editor.getActiveQuotation(editor.value)
    should.equal(first, editor.value.document.getNode('quote-1'))

    editor.moveToStartOfNode(editor.value.document.getNode('second'))
    const second = editor.getActiveQuotation(editor.value)
    should.equal(second, editor.value.document.getNode('quote-2'))

    editor.moveToStartOfNode(editor.value.document.getNode('third'))
    const third = editor.getActiveQuotation(editor.value)
    should.equal(third, editor.value.document.getNode('quote-3'))
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
