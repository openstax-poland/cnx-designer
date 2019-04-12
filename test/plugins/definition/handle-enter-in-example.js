/** @jsx h */

export default (change, editor) => {
    editor.run('onKeyDown', { key: 'Enter' })
    editor.run('onKeyDown', { key: 'Enter' })
    change.moveToEndOfBlock()
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
            <example>
                <p>Exam<cursor/>ple</p>
            </example>
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
                <p>Exam</p>
                <p><text/></p>
                <p>ple</p>
            </example>
            <meaning>
                <p><cursor/></p>
            </meaning>
        </definition>
    </document>
</value>
