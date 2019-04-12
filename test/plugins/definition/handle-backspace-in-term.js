/** @jsx h */

export default (change, editor) => {
    editor.run('onKeyDown', { key: 'Backspace' })
}

export const input = <value>
    <document>
        <p>Before</p>
        <definition>
            <term><cursor/>Term</term>
            <meaning>
                <p>Meaning</p>
            </meaning>
        </definition>
        <p>After</p>
    </document>
</value>

export const output = <value>
    <document>
        <p>Before<cursor/>Term</p>
        <definition>
            <term><text/></term>
            <meaning>
                <p>Meaning</p>
            </meaning>
        </definition>
        <p>After</p>
    </document>
</value>

