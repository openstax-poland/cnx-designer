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
                <p>Mea<cursor/>ning</p>
            </meaning>
            <example>
                <p>Example</p>
            </example>
        </definition>
    </document>
</value>

export const output = <value>
    <document>
        <definition>
            <term><text/></term>
            <meaning>
                <p>Mea</p>
            </meaning>
            <meaning>
                <p><text/></p>
            </meaning>
            <meaning>
                <p><cursor/>ning</p>
            </meaning>
            <example>
                <p>Example</p>
            </example>
        </definition>
    </document>
</value>
