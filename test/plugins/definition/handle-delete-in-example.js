/** @jsx h */

export default (change, editor) => {
  editor.run('onKeyDown', { key: 'Delete' })
}

export const input = <value>
    <document>
        <definition>
            <term><text/></term>
            <meaning>
                <p>Meaning</p>
            </meaning>
            <example>
                <p>Example<cursor/></p>
            </example>
            <seealso>
                <term>Term</term>
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
            <example>
                <p>Example<cursor/>Term</p>
            </example>
        </definition>
    </document>
</value>