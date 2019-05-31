/** @jsx h */

export default editor => {
    editor.run('onKeyDown', { key: 'Backspace' })
}

export const input = <value>
    <document>
        <definition>
            <defterm>Term</defterm>
            <defmeaning>
                <p><text/></p>
            </defmeaning>
        </definition>
        <definition>
            <defterm><cursor/>Term</defterm>
            <defmeaning>
                <p>Meaning</p>
            </defmeaning>
        </definition>
    </document>
</value>

export const output = <value>
    <document>
        <definition>
            <defterm>Term</defterm>
            <defmeaning>
                <p><cursor/>Term</p>
            </defmeaning>
        </definition>
        <definition>
            <defterm><text/></defterm>
            <defmeaning>
                <p>Meaning</p>
            </defmeaning>
        </definition>
    </document>
</value>
