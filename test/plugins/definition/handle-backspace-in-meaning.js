/** @jsx h */

export default editor => editor.run('onKeyDown', { key: 'Backspace' })

export const input = <value>
    <document>
        <definition>
            <defterm>Term</defterm>
            <defmeaning>
                <p><cursor/>Meaning</p>
            </defmeaning>
        </definition>
    </document>
</value>

export const output = <value>
    <document>
        <definition>
            <defterm>Term<cursor/>Meaning</defterm>
            <defmeaning>
                <p><text/></p>
            </defmeaning>
        </definition>
    </document>
</value>
