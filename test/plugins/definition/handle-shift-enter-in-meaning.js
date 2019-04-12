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
                <p>Mea<cursor/>ning</p>
            </meaning>
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
        </definition>
    </document>
</value>
