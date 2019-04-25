/** @jsx h */

export default (change, editor) => {
  editor.run('onKeyDown', { key: 'Backspace' })
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
                <term>t<cursor/></term>
            </seealso>
        </definition>
    </document>
</value>

export const output = <value>
    <document>
        <definition>
            <term>Term</term>
            <meaning>
                <p>Meaning<cursor/></p>
            </meaning>
        </definition>
    </document>
</value>