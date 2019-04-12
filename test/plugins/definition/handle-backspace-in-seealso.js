/** @jsx h */

export default (change, editor) => {
  editor.run('onKeyDown', { key: 'Backspace' })
}

export const input = <value>
    <document>
        <definition>
            <term>Term</term>
            <meaning>
                <p>Meaning</p>
            </meaning>
            <seealso>
                <term><cursor/>Term</term>
            </seealso>
        </definition>
    </document>
</value>

export const output = <value>
    <document>
        <definition>
            <term>Term</term>
            <meaning>
                <p>Meaning<cursor/>Term</p>
            </meaning>
        </definition>
    </document>
</value>