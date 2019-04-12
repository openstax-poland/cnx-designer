/** @jsx h */

export default (change, editor) => {
    editor.run('onKeyDown', { key: 'Enter' })
    change.moveToStartOfNode(change.value.document.getNode('example'))
    editor.run('onKeyDown', { key: 'Enter' })
    change.moveToStartOfNode(change.value.document.getNode('meaning'))
    editor.run('onKeyDown', { key: 'Enter' })
}

export const input = <value>
    <document>
        <definition>
            <term><text/></term>
            <meaning key="meaning">
                <p>Meaning</p>
            </meaning>
            <example key="example">
                <p>Example</p>
            </example>
            <seealso>
                <term><cursor/>Term</term>
            </seealso>
        </definition>
    </document>
</value>

export const output = <value>
    <document>
        <definition>
            <term><text/></term>
            <meaning key="meaning">
                <p><text/></p>
            </meaning>
            <meaning>
                <p><cursor/>Meaning</p>
            </meaning>
            <example key="example">
                <p><text/></p>
                <p>Example</p>
            </example>
            <seealso>
                <term><text/></term>
                <term>Term</term>
            </seealso>
        </definition>
    </document>
</value>
