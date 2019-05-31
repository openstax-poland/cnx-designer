/** @jsx h */

export default editor => editor.normalize()

export const input = <value>
    <document>
        <definition>
            <defmeaning>
                <p><cursor/>Meaning</p>
            </defmeaning>
        </definition>
    </document>
</value>

export const output = <value>
    <document>
        <definition>
            <defterm><text/></defterm>
            <defmeaning>
                <p><cursor/>Meaning</p>
            </defmeaning>
        </definition>
    </document>
</value>
