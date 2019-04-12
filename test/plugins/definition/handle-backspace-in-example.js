/** @jsx h */

export default (change, editor) => {
  editor.run('onKeyDown', { key: 'Backspace' })
}

export const input = <value>
    <document>
        <definition>
            <term><text/></term>
            <meaning>
                <p>Meaning</p>
            </meaning>
            <example>
                <p><cursor/>Example</p>
            </example>
        </definition>
    </document>
</value>

export const output = <value>
    <document>
        <definition>
            <term><text/></term>
            <meaning>
                <p>Meaning<cursor/>Example</p>
            </meaning>
        </definition>
    </document>
</value>