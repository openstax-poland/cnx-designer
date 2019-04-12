/** @jsx h */

export default (change, editor) => {
    editor.run('onKeyDown', { key: 'Enter' })
    editor.run('onKeyDown', { key: 'Enter' })
}

export const input = <value>
    <document>
        <definition>
            <term><text/></term>
            <meaning>
                <p>Meaning</p>
            </meaning>
            <seealso>
                <term>Te<cursor/>rm</term>
            </seealso>
        </definition>
    </document>
</value>

export const output = <value>
    <document>
        <definition>
            <term><text/></term>
            <meaning>
                <p>Meaning</p>
            </meaning>
            <seealso>
                <term>Te</term>
                <term><text/></term>
                <term><cursor/>rm</term>
            </seealso>
        </definition>
    </document>
</value>
