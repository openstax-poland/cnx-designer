/** @jsx h */

export default (change, editor) => {
    editor.run('onKeyDown', { key: 'Enter', shiftKey: true })
    editor.run('onKeyDown', { key: 'Enter', shiftKey: true })
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
                <p><cursor/>ple</p>
            </example>
        </definition>
    </document>
</value>
